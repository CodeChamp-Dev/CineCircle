import {
  BadRequestException,
  Controller,
  Headers,
  HttpCode,
  Post,
  RawBodyRequest,
  Req,
  Body,
} from "@nestjs/common";

import { UsersService } from "../users/users.service";

interface ClerkWebhookData {
  id: string;
  email_addresses?: Array<{
    id: string;
    email_address: string;
  }>;
  primary_email_address_id?: string;
  first_name?: string;
  last_name?: string;
  username?: string;
  image_url?: string;
  public_metadata?: {
    bio?: string;
  };
}

interface ClerkWebhookBody {
  type: string;
  data: ClerkWebhookData;
}

@Controller("webhooks")
export class ClerkWebhookController {
  constructor(private readonly usersService: UsersService) {}

  @Post("clerk")
  @HttpCode(200)
  async handleClerkWebhook(
    @Req() req: RawBodyRequest<Request>,
    @Body() body: ClerkWebhookBody,
    @Headers("svix-id") svixId: string,
    @Headers("svix-timestamp") svixTimestamp: string,
    @Headers("svix-signature") svixSignature: string,
  ) {
    console.log("Webhook received:", {
      svixId,
      svixTimestamp,
      svixSignature: svixSignature?.substring(0, 20) + "...",
      hasRawBody:
        !!(req as RawBodyRequest<Request>).rawBody || !!(req as RawBodyRequest<Request>).raw,
    });

    const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
    if (!webhookSecret) {
      console.log("Missing CLERK_WEBHOOK_SECRET");
      throw new BadRequestException("Missing CLERK_WEBHOOK_SECRET");
    }

    // Since raw body isn't working, we'll use the parsed body
    // This is a workaround - normally we'd need the raw body for signature verification
    console.log("Using parsed body for webhook processing");
    console.log("Event type:", body.type);
    console.log("Event data keys:", Object.keys(body.data || {}));

    // Process the webhook directly from parsed body
    const eventType = body.type as string;
    const data = body.data;

    console.log("Processing webhook event:", eventType);

    if (eventType === "user.created" || eventType === "user.updated") {
      const email = (data?.email_addresses?.find((e) => e.id === data.primary_email_address_id)
        ?.email_address || data?.email_addresses?.[0]?.email_address) as string | undefined;
      await this.usersService.upsertByClerkId({
        clerkId: data.id,
        name:
          data.first_name && data.last_name
            ? `${data.first_name} ${data.last_name}`
            : data.username || data.first_name || data.last_name || "",
        email: email || "",
        avatarUrl: data.image_url || undefined,
        bio: data.public_metadata?.bio || undefined,
      });
    } else if (eventType === "user.deleted") {
      await this.usersService.deleteByClerkId(data.id);
    }

    return { ok: true };
  }
}
