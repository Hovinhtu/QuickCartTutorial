import dbConnect from "@/config/db";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import User from "@/models/User";

export async function POST(request) {
    try{

        const {userId} = getAuth(request);

        const {cartData} =  await request.json();

        await dbConnect();

        const user = await User.findById(userId);

        if(!user) {
            return NextResponse.json({success: false, message: "User not found" + userId});
        }

        if(!cartData) {
            return NextResponse.json({success: false, message: "Cart data not found"});
        }
        user.cartItems = cartData;
        await user.save()

        return NextResponse.json({success: true, message: "Cart updated successfully"});

    } catch (error) {
        return NextResponse.json({success: false, message: error.message});
    }
}