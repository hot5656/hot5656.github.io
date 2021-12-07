---
title: JavaScript Issue
abbrlink: '4571'
date: 2021-12-07 08:56:53
categories: Coding
tags:
	- javascript
	- issue
---


### Braintree 
#### TypeError: braintree.connect is not a function
``` js
// 修正前 connect()
const gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

// 修正後 BraintreeGateway()
const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});
```

<!--more-->

#### A linked PayPal Sandbox account is required to use…ls on linking your PayPal sandbox with Braintree.
``` js
// flow: "vault", 設錯
function showDropIn() {
  return (
    <div onBlur={() => setData({ ...data, error: "" })}>
      {data.clientToken != null && products.length > 0 ? (
        <DropIn
          options={{
            authorization: data.clientToken,
            // ad paypal option
            paypal: {
              flow: "vault",
            },
          }}
          onInstance={(instance) => (data.instance = instance)}
          />
        ) : null}
      <button onClick={handleBuy} className="btn btn-success btn-block">
        Pay
      </button>
    </div>
  );
}
```

#### add payapl chrome developer tools show [Violation]
+ [Violation] Added synchronous DOM mutation listener to a 'DOMNodeInserted' event. Consider using MutationObserver to make the page more responsive.
	--> 因 chrome versbose enabel, chrome 給的建議, don't care,設定 versbose disable 即可

<div style="max-width:1000px">
	{% asset_img pic1.png pic1 %}
</div>