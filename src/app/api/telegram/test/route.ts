import { NextResponse } from 'next/server';
import { telegramBot } from '@/lib/telegram/bot';

export async function POST() {
  try {
    const result = await telegramBot.sendNotification({
      title: 'Handshake Test Alert',
      message: 'Testing connection from Omnia Stores Autonomous Growth Platform.\nTelegram Bot integration is active and operating normally.',
      level: 'SUCCESS',
      actionUrl: 'http://localhost:3000/pipeline',
      actionText: 'Open Growth Pipeline',
    });

    return NextResponse.json({
      success: result.success,
      status: result.status,
      simulated: result.simulated,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
