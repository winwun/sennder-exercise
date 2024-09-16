/* eslint-disable max-classes-per-file */
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { AWSError } from 'aws-sdk/lib/error';
import { Request } from 'aws-sdk/lib/request';

type JestMockAWSRequest<T> = jest.Mock<Request<T, AWSError>>;

interface DocumentClientMock {
  get?: JestMockAWSRequest<DocumentClient.Get>;
  query?: JestMockAWSRequest<DocumentClient.QueryInput>;
  update?: JestMockAWSRequest<DocumentClient.Update>;
  put?: JestMockAWSRequest<DocumentClient.Put>;
  batchGet?: JestMockAWSRequest<DocumentClient.BatchGetItemInput>;
}

type MockAnalytics = {
  mockTrack: jest.Mock;
};

export function mockAnalytics(): MockAnalytics {
  const mockTrack = jest.fn((params, cb) => {
    cb(null, true);
  });

  jest.mock(
    'analytics-node',
    () =>
      class {
        track = mockTrack;
      },
  );

  return { mockTrack };
}

export function mockFetchResponse(): jest.Mock {
  const mockFetch = jest.fn();

  jest.mock('node-fetch', () => ({
    __esModule: true,
    default: mockFetch,
  }));

  return mockFetch;
}

export function mockUuid(): void {
  jest.mock(
    'uuid/v4',
    () => (): string => '943e8620-f948-47da-bc47-6aba47a0d6d7',
  );
}

export function mockSNSPublish(): jest.Mock {
  const mockPublish = jest.fn(() => ({
    promise: jest.fn(
      () =>
        new Promise((resolve, reject) => {
          resolve(null);
          // eslint-disable-next-line prefer-promise-reject-errors
          reject(null);
        }),
    ),
  }));

  const mockedFunction = jest.fn(() => ({
    publish: mockPublish,
  }));

  jest.mock('aws-sdk/clients/sns', () => mockedFunction);

  return mockPublish;
}

type DynamoMock = {
  mockGet?: jest.Mock;
  mockQuery?: jest.Mock;
  mockPut?: jest.Mock;
  mockBatchGet?: jest.Mock;
};

export function mockDynamoDb({
  mockGet,
  mockQuery,
  mockPut,
  mockBatchGet,
}: DynamoMock): DynamoMock {
  jest.mock('aws-sdk/clients/dynamodb', () => ({
    DocumentClient(): DocumentClientMock {
      return {
        ...(mockGet ? { get: mockGet } : {}),
        ...(mockQuery ? { query: mockQuery } : {}),
        ...(mockPut ? { put: mockPut } : {}),
        ...(mockBatchGet ? { batchGet: mockBatchGet } : {}),
      };
    },
  }));

  return {
    mockGet,
    mockBatchGet,
    mockQuery,
    mockPut,
  };
}

type AssumeRoleMock = {
  assumeRole: jest.Mock;
};

export function mockSts({ assumeRole }: AssumeRoleMock): AssumeRoleMock {
  jest.mock(
    'aws-sdk/clients/sts',
    () =>
      class {
        assumeRole = assumeRole;
      },
  );

  return { assumeRole };
}

type S3Mock = {
  getSignedUrl: jest.Mock;
};

export function mockS3({ getSignedUrl }: S3Mock): S3Mock {
  jest.mock(
    'aws-sdk/clients/s3',
    () =>
      class {
        getSignedUrl = getSignedUrl;
      },
  );

  return { getSignedUrl };
}
