import { NextRequest, NextResponse } from "next/server";
import { verifyCloudProof, IVerifyResponse, ISuccessResult } from "@worldcoin/minikit-js";

interface IRequestPayload {
  payload: ISuccessResult;
  action: string;
  signal?: string;
}

export async function POST(req: NextRequest) {
  try {
    const { payload, action, signal } = (await req.json()) as IRequestPayload;
    
    const app_id = process.env.APP_ID as `app_${string}`;
    
    if (!app_id) {
      return NextResponse.json(
        { error: "APP_ID not configured" },
        { status: 500 }
      );
    }

    const verifyRes = (await verifyCloudProof(
      payload,
      app_id,
      action,
      signal
    )) as IVerifyResponse;

    if (verifyRes.success) {
      // Store nullifier hash in your database to prevent double claims
      // This is where you would perform backend actions like:
      // - Marking user as verified
      // - Recording the action in your database
      // - Triggering token airdrops, etc.
      
      return NextResponse.json({
        success: true,
        nullifierHash: payload.nullifier_hash,
        verifyRes,
      });
    } else {
      return NextResponse.json(
        { 
          success: false, 
          error: "Verification failed",
          details: verifyRes 
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Verification error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
