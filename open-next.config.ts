import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// Кэш инкрементальной регенерации (ISR) не подключаем: на сайте нет ни одной
// страницы с `revalidate`, все 12 собираются на каждый запрос. Понадобится —
// добавим r2IncrementalCache и бакет R2.
export default defineCloudflareConfig();
