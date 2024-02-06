import { ClientSecretCredential, DefaultAzureCredential } from "@azure/identity";
import { SecretClient } from "@azure/keyvault-secrets";

export const AzureKeyVaultInstance = () => {
//   const credential = new DefaultAzureCredential();
  const keyVaultName = process.env.AZURE_KEY_VAULT_NAME;

  const credential = process.env.NODE_ENV === 'production'
  ? new DefaultAzureCredential()
  : new ClientSecretCredential(
      process.env.AZURE_TENANT_ID!,
      process.env.AZURE_CLIENT_ID!,
      process.env.AZURE_CLIENT_SECRET!
    );
  console.log(credential);
  console.log(process.env.NODE_ENV);

  if (!keyVaultName) {
    throw new Error(
      "Azure Key vault is not configured correctly, check environment variables."
    );
  }
  const url = `https://${keyVaultName}.vault.azure.net`;

  return new SecretClient(url, credential);
};
