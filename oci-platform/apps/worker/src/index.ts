import { AeoVisibilitySampler, HeadlessBlogPublisher } from '@oci/integrations';
import { db } from '@oci/database';

export interface JobPayload {
  id: string;
  type: 'AEO_VISIBILITY_SCAN' | 'SCHEDULED_SYNDICATION' | 'BACKLINK_AUDIT';
  data: any;
}

export class OciQueueWorker {
  public static async processJob(job: JobPayload): Promise<{ success: boolean; result: any }> {
    console.log(`[Worker] Processing Job ${job.id} (${job.type})`);

    switch (job.type) {
      case 'AEO_VISIBILITY_SCAN': {
        const { engine, query, brand } = job.data;
        const sample = await AeoVisibilitySampler.sampleQuery(engine, query, brand);
        return { success: true, result: sample };
      }

      case 'SCHEDULED_SYNDICATION': {
        const { articleId } = job.data;
        const article = await db.getArticle(articleId);
        if (!article) throw new Error('Article not found for syndication');
        const pub = await HeadlessBlogPublisher.publish({
          title: article.title,
          slug: article.slug,
          excerpt: article.excerpt || '',
          contentHtml: article.contentHtml,
          language: article.language,
        });
        return { success: true, result: pub };
      }

      case 'BACKLINK_AUDIT': {
        const backlinks = await db.listBacklinks();
        return {
          success: true,
          result: {
            auditedCount: backlinks.length,
            healthyRatio: 1.0,
            activeCount: backlinks.length,
          },
        };
      }

      default:
        throw new Error(`Unsupported job type: ${(job as any).type}`);
    }
  }
}
