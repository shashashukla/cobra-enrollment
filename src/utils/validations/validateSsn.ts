export default function isValidSsn(ssnData: string) {
  const ssnFormat = new RegExp(
    "^(?!666|000|9\\d{2})\\d{3}-(?!00)\\d{2}-(?!0{4})\\d{4}$"
  );

  return ssnFormat.test(ssnData);
}
