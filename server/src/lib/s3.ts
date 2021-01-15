import * as aws from 'aws-sdk'

const s3 = new aws.S3()

export const deleteFiles = async (prefix: string) => {
  const list = await s3
    .listObjectsV2({
      Bucket: process.env.ROUTES_BUCKET_NAME,
      Prefix: prefix,
    })
    .promise()

  await s3
    .deleteObjects({
      Bucket: process.env.ROUTES_BUCKET_NAME,
      Delete: {
        Objects: list.Contents.map((item) => ({ Key: item.Key })),
      },
    })
    .promise()
}

export const getSignedUrl = (
  action: string,
  key: string,
  contentType?: string,
) => {
  const ext = contentType ? `.${contentType.split('/')[1]}` : ''

  return s3.getSignedUrl(action, {
    Bucket: process.env.ROUTES_BUCKET_NAME,
    Key: `${key}${ext}`,
    ContentType: contentType,
    Expires: 120,
  })
}

export const getFilesList = async (prefix: string) => {
  const list = await s3
    .listObjectsV2({
      Bucket: process.env.ROUTES_BUCKET_NAME,
      Prefix: prefix,
    })
    .promise()

  return list.Contents.map((item) => item.Key)
}
