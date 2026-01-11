import {
  DeleteObjectCommand,
  DeleteObjectsCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export type StorageConfig = {
  client: S3Client;
  bucket: string;
  publicBase?: string;
};

export const createStorageConfig = (): StorageConfig | null => {
  const accessKeyId = process.env.R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
  const endpoint = process.env.R2_ENDPOINT;
  const bucket = process.env.R2_BUCKET;
  const publicBase = process.env.R2_PUBLIC_BASE;

  if (!accessKeyId || !secretAccessKey || !endpoint || !bucket) {
    return null;
  }

  return {
    bucket,
    publicBase,
    client: new S3Client({
      region: "auto",
      endpoint,
      credentials: { accessKeyId, secretAccessKey },
    }),
  };
};

export const generateStoragePath = (
  userId: string,
  fileId: string,
  extension: string
) => {
  const normalizedExtension = extension.replace(/^\./, "");
  return `${userId}/${fileId}.${normalizedExtension}`;
};

export const resolveFileUrl = async (
  key: string,
  expiresInSeconds = 60 * 60 * 24
): Promise<string> => {
  const config = createStorageConfig();
  if (!config) {
    throw new Error("Storage misconfigured");
  }

  const { client, bucket, publicBase } = config;
  if (publicBase) {
    return `${publicBase.replace(/\/$/, "")}/${key}`;
  }

  return getSignedUrl(client, new GetObjectCommand({ Bucket: bucket, Key: key }), {
    expiresIn: expiresInSeconds,
  });
};

export const uploadFile = async (
  buffer: Buffer,
  key: string,
  contentType: string
): Promise<string | null> => {
  const config = createStorageConfig();
  if (!config) {
    throw new Error("Storage misconfigured");
  }

  const { client, bucket, publicBase } = config;
  await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: buffer,
      ContentType: contentType,
    })
  );

  if (publicBase) {
    return `${publicBase.replace(/\/$/, "")}/${key}`;
  }

  return null;
};

export const deleteFile = async (key: string): Promise<void> => {
  const config = createStorageConfig();
  if (!config) {
    throw new Error("Storage misconfigured");
  }

  const { client, bucket } = config;
  await client.send(new DeleteObjectCommand({ Bucket: bucket, Key: key }));
};

export const deleteFiles = async (keys: string[]): Promise<void> => {
  if (keys.length === 0) return;

  const config = createStorageConfig();
  if (!config) {
    throw new Error("Storage misconfigured");
  }

  const { client, bucket } = config;
  await client.send(
    new DeleteObjectsCommand({
      Bucket: bucket,
      Delete: {
        Objects: keys.map((key) => ({ Key: key })),
        Quiet: true,
      },
    })
  );
};
