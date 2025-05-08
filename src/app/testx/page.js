  'use client';
  import { useState, useEffect } from 'react';

  export default function Subscribe() {
    const [email, setEmail] = useState('');

    // Load Razorpay script
    useEffect(() => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.body.appendChild(script);
      return () => {
        document.body.removeChild(script);
      };
    }, []);

    const handleSubscription = async () => {
      try {
        const res = await fetch('/api/subscription', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            plan_id: 'plan_QPZ0EQNaeZoKCB' // Your Razorpay plan ID
          }),
        });
    
        const subscription = await res.json();
    
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          subscription_id: subscription.id,
          name: 'Your Company',
          description: 'Monthly Subscription',
          prefill: {
            email: email, // Pass email here
          },
          theme: { color: '#3399cc' },
          handler: function (response) {
            alert(`Subscription ID: ${response.subscription_id}`);
            // Verify payment on your backend here
          }
        };
    
        const rzp = new window.Razorpay(options);
        rzp.open();
      } catch (err) {
        console.error('Subscription error:', err);
        alert('Failed to initiate subscription');
      }
    };

    return (
      <div>
        <input
          type="email"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <button onClick={handleSubscription}>Subscribe</button>
      </div>
    );
  }