"use client";

import * as React from "react";
import type * as Three from "three";
import { Box, RotateCw } from "lucide-react";
import { useTranslations } from "next-intl";

/* Соединение двух труб: ниппель заходит в раструб, затем модель
   разрезается вдоль оси, и видно, как стык устроен изнутри.

   Модель pipe-segment.glb — ОДНА целая труба (полный круг) с раструбом
   на одном конце и ниппелем с кольцами на другом. Вторую трубу делаем
   клоном в коде: один файл вместо двух, и браузер кэширует его для обоих
   разделов страницы. Собрана по слоям, поэтому разрез показывает
   настоящую структуру. Сжата Draco, распаковщик лежит в /public/draco.

   three и саму модель грузим только когда блок доскроллили — иначе
   страница продукции потяжелела бы на пустом месте. */

type Phase = "apart" | "inserting" | "cutting" | "done";

// Вторая труба стоит на этом расстоянии — так модель и собрана.
const PIPE_PITCH = 4.632;
const TRAVEL = 1.25;   // на сколько вторая труба отъезжает в разобранном виде
const CUT_OPEN = 0.62; // положение плоскости, при котором ничего не срезано

export function JointViewer() {
  const t = useTranslations("Products");
  const boxRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const replayRef = React.useRef<(() => void) | null>(null);

  const [near, setNear] = React.useState(false);
  const [ready, setReady] = React.useState(false);
  const [failed, setFailed] = React.useState(false);

  // Подгружаем, когда блок близко к экрану.
  React.useEffect(() => {
    const el = boxRef.current;
    if (!el) return;

    // Если блок уже виден, грузим сразу: IntersectionObserver в некоторых
    // браузерах молчит для элемента, видимого с самого начала.
    const visible = () => {
      const r = el.getBoundingClientRect();
      return r.top < window.innerHeight + 400 && r.bottom > -400;
    };
    if (visible()) {
      setNear(true);
      return;
    }

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "400px" }
    );
    io.observe(el);

    return () => io.disconnect();
  }, []);

  React.useEffect(() => {
    if (!near || !canvasRef.current) return;
    let alive = true;
    let dispose = () => {};

    (async () => {
      const THREE = await import("three");
      const { GLTFLoader } = await import("three/examples/jsm/loaders/GLTFLoader.js");
      const { DRACOLoader } = await import("three/examples/jsm/loaders/DRACOLoader.js");
      if (!alive) return;

      const canvas = canvasRef.current!;
      const stage = boxRef.current!;

      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.localClippingEnabled = true;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(34, 16 / 10, 0.05, 100);

      scene.add(new THREE.HemisphereLight(0xffffff, 0x4e5650, 0.95));
      const key = new THREE.DirectionalLight(0xffffff, 1.0);
      key.position.set(2.5, 5, 4);
      scene.add(key);
      const fill = new THREE.DirectionalLight(0xffffff, 0.4);
      fill.position.set(-4, 1.5, -3);
      scene.add(fill);

      // Срезаем верхнюю половину: камера стоит выше и смотрит внутрь стыка.
      const plane = new THREE.Plane(new THREE.Vector3(0, -1, 0), CUT_OPEN);

      // Распаковщик Draco берём со своего сайта, а не с чужого CDN.
      const draco = new DRACOLoader();
      draco.setDecoderPath("/draco/");
      const loader = new GLTFLoader();
      loader.setDRACOLoader(draco);

      const gltf = await loader.loadAsync("/models/pipe-segment.glb").catch(() => null);
      if (!alive) return;
      if (!gltf) {
        setFailed(true);
        return;
      }

      // Первая труба стоит, вторая — её клон — надвигается ниппелем в раструб.
      // Клон делит геометрию с оригиналом, так что памяти это почти не стоит.
      const first = gltf.scene;
      const second = first.clone(true);
      scene.add(first, second);

      const nipple = second; // едет именно вторая труба

      scene.traverse((o) => {
        const mesh = o as Three.Mesh;
        if (!mesh.isMesh) return;
        const material = (mesh.material as Three.MeshStandardMaterial).clone();
        // Двусторонние грани: у среза мы смотрим на изнанку оболочек.
        material.side = THREE.DoubleSide;
        material.clippingPlanes = [plane];
        mesh.material = material;
      });

      let insertion = 0;   // 0 — врозь, 1 — собрано
      let cut = 0;         // 0 — целая труба, 1 — разрезана
      // Почти поперёк оси: вдоль трубы стык уезжает вдаль и не читается.
      let azimuth = 0.16;
      let polar = 1.28;
      let distance = 5.4;
      const POLAR_FAR = 1.28;   // трубы врозь — смотрим сбоку
      const POLAR_NEAR = 1.1;   // разрез открыт — чуть сверху, видно внутрь
      const DIST_FAR = 5.4;
      const DIST_NEAR = 2.9;
      // Стык живёт около нуля по оси — на него и смотрим.
      // Смотрим на середину подписанного участка, а не на самый стык:
      // иначе крайние метки уезжают за край кадра.
      const target = new THREE.Vector3(2.0, 0, 0);

      let width = 0;
      let height = 0;
      function resize() {
        width = stage.clientWidth;
        height = Math.round(Math.min(width * 0.62, window.innerHeight * 0.62));
        renderer.setSize(width, height, false);
        canvas.style.height = `${height}px`;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      }
      resize();
      window.addEventListener("resize", resize);

      let dragging = false;
      let lastX = 0;
      let lastY = 0;
      const down = (e: PointerEvent) => {
        // Кнопка «Показать заново» лежит внутри области поворота.
        // Без этой проверки setPointerCapture забирает нажатие себе,
        // клик до кнопки не доходит, и она молчит.
        if ((e.target as HTMLElement).closest("button")) return;
        dragging = true;
        lastX = e.clientX;
        lastY = e.clientY;
        stage.setPointerCapture(e.pointerId);
      };
      const move = (e: PointerEvent) => {
        if (!dragging) return;
        azimuth -= (e.clientX - lastX) * 0.006;
        // Ниже плоскости разреза смотреть нечего — там пусто.
        polar = Math.min(1.52, Math.max(0.45, polar - (e.clientY - lastY) * 0.005));
        lastX = e.clientX;
        lastY = e.clientY;
      };
      const up = () => {
        dragging = false;
      };
      stage.addEventListener("pointerdown", down);
      stage.addEventListener("pointermove", move);
      stage.addEventListener("pointerup", up);
      stage.addEventListener("pointercancel", up);

      let phase: Phase = "apart";
      let hold = 0.6;
      replayRef.current = () => {
        insertion = 0;
        cut = 0;
        phase = "apart";
        hold = 0.6;
      };

      let previous = performance.now();
      let frameId = 0;
      const tick = (now: number) => {
        const dt = Math.min((now - previous) / 1000, 0.05);
        previous = now;

        if (phase === "apart") {
          hold -= dt;
          if (hold <= 0) phase = "inserting";
        } else if (phase === "inserting") {
          insertion = Math.min(1, insertion + dt * 0.55);
          if (insertion === 1) {
            phase = "cutting";
            hold = 0.45;
          }
        } else if (phase === "cutting") {
          hold -= dt;
          if (hold <= 0) {
            cut = Math.min(1, cut + dt * 0.7);
            if (cut === 1) phase = "done";
          }
        }

        nipple.position.x = PIPE_PITCH + (1 - insertion) * TRAVEL;
        plane.constant = CUT_OPEN * (1 - cut);
        distance = DIST_FAR + (DIST_NEAR - DIST_FAR) * cut;
        polar = dragging ? polar : POLAR_FAR + (POLAR_NEAR - POLAR_FAR) * cut;

        camera.position.set(
          target.x + distance * Math.sin(polar) * Math.sin(azimuth),
          target.y + distance * Math.cos(polar),
          target.z + distance * Math.sin(polar) * Math.cos(azimuth)
        );
        camera.lookAt(target);
        renderer.render(scene, camera);
        frameId = requestAnimationFrame(tick);
      };
      frameId = requestAnimationFrame(tick);
      setReady(true);

      dispose = () => {
        cancelAnimationFrame(frameId);
        window.removeEventListener("resize", resize);
        stage.removeEventListener("pointerdown", down);
        stage.removeEventListener("pointermove", move);
        stage.removeEventListener("pointerup", up);
        stage.removeEventListener("pointercancel", up);
        draco.dispose();
        renderer.dispose();
      };
    })().catch(() => {
      if (alive) setFailed(true);
    });

    return () => {
      alive = false;
      dispose();
    };
  }, [near]);

  return (
    <div
      ref={boxRef}
      className="relative w-full overflow-hidden rounded-2xl border border-[var(--line-2)] bg-[var(--paper-2)]"
      style={{ touchAction: "none" }}
    >
      <canvas
        ref={canvasRef}
        className="block w-full"
        aria-label={t("jointAlt")}
        role="img"
      />

      {!ready && !failed && (
        <div className="grid aspect-[16/10] place-items-center gap-3 text-[var(--muted)]">
          <Box className="size-6 animate-pulse" aria-hidden="true" />
          <span className="ff-mono text-[0.68rem] uppercase tracking-[0.12em]">
            {t("viewerLoading")}
          </span>
        </div>
      )}

      {failed && (
        <div className="grid aspect-[16/10] place-items-center px-6 text-center text-[var(--muted)]">
          {t("jointFailed")}
        </div>
      )}

      {ready && (
        <>
          <button
            type="button"
            onClick={() => replayRef.current?.()}
            className="absolute bottom-3 left-3 rounded-full border border-[var(--line-2)] bg-[var(--paper)]/85 px-4 py-2 ff-mono text-[0.6rem] uppercase tracking-[0.1em] text-[var(--ink)] backdrop-blur transition-colors hover:border-[var(--cyan-ink)] sm:bottom-4 sm:left-4 sm:text-[0.62rem]"
          >
            {t("jointReplay")}
          </button>
          <span className="pointer-events-none absolute bottom-3 right-3 flex items-center gap-2 whitespace-nowrap rounded-full bg-[var(--ink)]/70 px-3 py-1.5 ff-mono text-[0.58rem] uppercase tracking-[0.1em] text-[var(--paper)] backdrop-blur sm:bottom-4 sm:right-4 sm:px-4 sm:py-2 sm:text-[0.62rem]">
            <RotateCw className="size-3.5" aria-hidden="true" />
            {t("viewerHint")}
          </span>
        </>
      )}
    </div>
  );
}
