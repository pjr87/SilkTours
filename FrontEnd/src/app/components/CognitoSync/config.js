/*
 config.js

 AWS,Facebook configuration info
 Written by: Phillip Ryan
*/

export default {
  //AWS Cognito
  awsAccountId: '803858137669',
  region: 'us-east-1',
  identityPoolId: 'us-east-1:214507f3-048d-4a2b-a874-09969dcb6f84',
  userPoolId: 'us-east-1_U8wBma7tt',
  clientId: '3nconl88mjb4sb7civmc8ivflm',
  iamAuthRole: 'arn:aws:iam::803858137669:role/Cognito_silktours_MOBILEHUB_2107655215Auth_Role',
  iamNoAuthRole: 'arn:aws:iam::803858137669:role/Cognito_silktours_MOBILEHUB_2107655215Unauth_Role',
  dataSet: 'silktours-userfiles-mobilehub-2107655215',

  //Facebook
  facebookAppId: '606443696175641',
  facebookAppSecret: 'aea0d287a34debcb3e540b829c66b5db',
  facebookVersion: 'v2.5',
}
