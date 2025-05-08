import User from "@/models/user.schema";
import { getCookie } from "@/utils/getCookie";
import { verifyToken } from "@/utils/tokenGenerator";

export async function POST(req) {
  const { planType, email } = await req.json(); // Remove customer_email from destructuring

  const planData = {
    Starter: "plan_QS190UaoAL78HP",
    Pro: "plan_QS190UaoAL78HP",
    Agency: "plan_QS190UaoAL78HP",
  };

  const plan_id = planData[planType];

  console.log(plan_id);

  if (!plan_id) {
    return new Response(JSON.stringify({ error: "Missing plan_id" }), {
      status: 400,
    });
  }

  const auth = Buffer.from(`${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`).toString("base64");

  console.log(process.env.RAZORPAY_KEY_ID);

  try {
    const jwt_data = await getCookie("access_token");
    const token = await verifyToken(jwt_data.value);
    const userId = token.userId;

    let customer_id;

    const userDetial = await User.findById(userId);
    // creating coustomer
    if (!userDetial?.paymentDetail?.customerId) {
      const customerRes = await fetch("https://api.razorpay.com/v1/customers", {
        method: "POST",
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: email.split("@")[0],
          email,
        }),
      });
  
      console.log("Customer Response :", customerRes);
      const customerData = await customerRes.json();
      console.log("customer Data: ", customerData);
      customer_id = customerData.id;
    }else{
      customer_id = userDetial?.paymentDetail?.customerId;
    }


    console.log("customer id: ",customer_id);

    
    const original = plan_QS1M3QavEN80aD;
    // creating payment -----
    const startAt = Math.floor(Date.now() / 1000) + 350;
    const response = await fetch("https://api.razorpay.com/v1/subscriptions", {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        plan_id: original,
        total_count: 12,
        customer_notify: 1,
        customer_id,
        start_at: startAt,
      }),
    });

    console.log("response subscription  Data: ",response);

    const data = await response.json();

    console.log("subscription response : =====================", data);

    if (!response.ok) {
      return new Response(JSON.stringify({ error: data.error.description }), {
        status: response.status,
      });
    }

    const planValue = {
      Starter: 75900,
      Pro: 244700,
      Agency: 666700,
    };
    const planPrice = planValue[planType];
    const responseData = {
      subscriptionId: data.id,
      planValue: planPrice,
    };

    const userObject = {
      subscriptionId: data.id,
      customerId: customer_id,
    };

    const userUpdate = await User.findByIdAndUpdate(
      userId,
      { paymentDetail: userObject },
      { new: true }
    );

    return Response.json(
      {
        message: "payment done successfully",
        success: true,
        status: 200,
        data: responseData,
      },
      {
        status: 200,
      }
    );
  } catch (err) {
    console.error("Subscription creation error:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}
