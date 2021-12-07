---
title: 金流
abbrlink: '4431'
date: 2021-12-07 08:56:49
categories: Coding
tags:
	- javascript
---


### Briantree sandbox
#### setup Briantree account
##### generate API Key( get Merchant ID, Public Key, Private Key)
login Briantree --> API --> Generate New API Key --> get API key
<div style="max-width:1000px">
	{% asset_img pic1.png pic1 %}
</div>

<!--more-->

<div style="max-width:1000px">
	{% asset_img pic2.png pic2 %}
</div>

##### set CVV 
Fraud Management --> CVV --> CVV does not match (when provided) (N) --> For Any Transaction
<div style="max-width:1000px">
	{% asset_img pic3.png pic3 %}
</div>

<div style="max-width:1000px">
	{% asset_img pic4.png pic4 %}
</div>

##### new Merchant Account ID 
Business --> new Sandbox Merchant Account --> set Merchant Account ID + currency

<div style="max-width:1000px">
	{% asset_img pic5.png pic5 %}
</div>

<div style="max-width:1000px">
	{% asset_img pic6.png pic6 %}
</div>

<div style="max-width:1000px">
	{% asset_img pic7.png pic7 %}
</div>


#### example code 
+ Merchant Account ID 是用來設定不同幣別
+ clientToken 設定 merchantAccountId 可但若要顯示 支援 payment 的方式 
+ transaction 設定 merchantAccountId 才會歸到設定帳戶,若未指定 merchantAccountId 會使用 default account 和 貨幣
``` js
// ./controllers/braintree.js
const User = require("../models/user");
const braintree = require("braintree");
require("dotenv").config();

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

exports.generateToken = (req, res) => {
  // transaction 設定 merchantAccountId 就好,clientToken 可以不用設
  // 但若要顯示 payment 的方式,就要設定
  // gateway.clientToken.generate({}, function (err, response) {
  gateway.clientToken.generate(
    { merchantAccountId: process.env.BRAINTREE_MERCHANT_ACCOUNT_ID },
    function (err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        // console.log(response);
        res.send(response);
      }
    }
  );
};

exports.processPayment = (req, res) => {
  let nonceFromTheClient = req.body.paymentMethodNonce;
  let amountFromTheClient = req.body.amount;
  // charge
  let newTransaction = gateway.transaction.sale(
    {
      amount: amountFromTheClient,
      paymentMethodNonce: nonceFromTheClient,
      // 可設定不同的 merchantAccountId( for 不同的貨幣)
      merchantAccountId: process.env.BRAINTREE_MERCHANT_ACCOUNT_ID,
      options: {
        submitForSettlement: true,
      },
    },
    (error, result) => {
      if (error) {
        res.status(500).json(error);
      } else {
        res.json(result);
      }
    }
  );
};
```

#### set paypal 
Processing --> paypal --> set PayPal Email, PayPal Client Id, PayPal Client Secret --> Link PayPal Sandbox

<div style="max-width:1000px">
	{% asset_img pic8.png pic8 %}
</div>


<div style="max-width:1000px">
	{% asset_img pic9.png pic9 %}
</div>

#### add paypal example code 
``` js
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


### PayPal sandbox(需先申請正式 paypal帳號)
#### get paypal merchant account 
My Apps & Credentials --> Create App --> get payapl merchant account information
<div style="max-width:1000px">
	{% asset_img pic11.png pic11 %}
</div>

<div style="max-width:1000px">
	{% asset_img pic12.png pic12 %}
</div>

<div style="max-width:1000px">
	{% asset_img pic16.png pic16 %}
</div>

#### get paypal personal account
SANDBOX --> Accounts --> Create account --> get pernal account information

<div style="max-width:1000px">
	{% asset_img pic13.png pic13 %}
</div>

<div style="max-width:1000px">
	{% asset_img pic14.png pic14 %}
</div>

<div style="max-width:1000px">
	{% asset_img pic15.png pic15 %}
</div>


### Test Credit Card Account Numbers
|Type|account #1|account #2|
|-----|--------|--------|
| American Express | 378282246310005 | 371449635398431 |
| JCB | 3530111333300000 | 3566002020360505 |
| Visa | 4111111111111111 | 4012888888881881 |
| MasterCard | 5555555555554444 | 5105105105105100 |


### 參考資料
+ [Stripe vs PayPal vs Braintree](https://rubygarage.org/blog/stripe-vs-braintree-vs-paypal-how-do-these-payment-platforms-compare)
+ [Stripe VS Braintree](https://www.merchantmaverick.com/stripe-vs-braintree/)
+ [做為電商 PM，我是如何選擇金流服務商](https://medium.com/kkdaytech/%E5%81%9A%E7%82%BA%E9%9B%BB%E5%95%86-pm-%E6%88%91%E6%98%AF%E5%A6%82%E4%BD%95%E9%81%B8%E6%93%87%E9%87%91%E6%B5%81%E6%9C%8D%E5%8B%99%E5%95%86-a81bc651f6a6)
+ [Sandbox | Braintree Payments](https://www.braintreepayments.com/sandbox)
+ [Send a client token to your client](https://developer.paypal.com/braintree/docs/start/hello-server/node)
+ [Paypal](https://www.paypal.com/tw/webapps/mpp/home) 
+ [Paypal Sandbox](ttps://developer.paypal.com/developer/accountsh/)

