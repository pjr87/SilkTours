/*
 config.js

 AWS,Facebook configuration info
 Written by: Phillip Ryan
*/

export default {
  //AWS Cognito
  awsAccountId: '803858137669',
  region: 'us-east-1',
  identityPoolId: 'us-east-1:5a1c088f-1ffe-4f5c-8a2b-5f4504d198a5',
  userPoolId: 'us-east-1_59hTNVuuw',
  clientId: '48duehir7mmuv9h22ugagumhni',
  iamAuthRole: 'arn:aws:iam::803858137669:role/Cognito_SilkToursAppAuth_Role',
  iamNoAuthRole: 'arn:aws:iam::803858137669:role/Cognito_SilkToursAppUnauth_Role',
  dataSet: 'silktours-userfiles-mobilehub-2107655215',

  //Facebook
  facebookAppId: '606443696175641',
  facebookAppSecret: 'aea0d287a34debcb3e540b829c66b5db',
  facebookVersion: 'v2.5',
}
