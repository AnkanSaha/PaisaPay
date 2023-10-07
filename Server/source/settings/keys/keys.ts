/* eslint-disable no-undef */

import {config} from 'dotenv'; // Config environment variables
config(); // Load environment variables

// Export keys
export enum NumberKeys {
	PORT= Number(process.env.PORT) || 5412,
}

// Export keys
export const StringKeys = {
    AppName: String('PaisaPay'),
	CORS_URL: String(process.env.CORS_ORIGIN) || '*',
    JWT_SECRET: String(process.env.JWT_SECRET),
    JWT_EXPIRES_IN: String(process.env.JWT_EXPIRES_IN) || '30d',
    StaticDirectoryName : String('Database'),
};

export const Database_Keys = {
    MongoDB: String(process.env.MONGODB_URL),
    ClientAccountCollectionName: String('ClientAccount'),
    ServerTransactionCollectionName: String('ServerTransactionDetail'),
    P2PTransactionCollectionName: String('P2PTransactionDetail'),
    HelpCenterCollectionName: String('HelpCenterDetail'),
}

// Payment Related Keys
export const Payment_Keys = {
    MERCHANT_ID: String(process.env.RAZORPAY_MERCHANT_ID),
}

// Export Status Codes for Global Use
/* The `export enum StatusCodes` is defining an enumeration in TypeScript. It assigns numeric values to
each member of the enumeration. In this case, the enumeration represents HTTP status codes. Each
member of the enumeration is assigned a corresponding HTTP status code. */
export enum StatusCodes {
	CONTINUE = 100,
    SWITCHING_PROTOCOLS = 101,
    PROCESSING = 102,
    OK = 200,
    CREATED = 201,
    ACCEPTED = 202,
    NON_AUTHORITATIVE_INFORMATION = 203,
    NO_CONTENT = 204,
    RESET_CONTENT = 205,
    PARTIAL_CONTENT = 206,
    MULTI_STATUS = 207,
    ALREADY_REPORTED = 208,
    IM_USED = 226,
    MULTIPLE_CHOICES = 300,
    MOVED_PERMANENTLY = 301,
    FOUND = 302,
    SEE_OTHER = 303,
    NOT_MODIFIED = 304,
    USE_PROXY = 305,
    SWITCH_PROXY = 306,
    TEMPORARY_REDIRECT = 307,
    PERMANENT_REDIRECT = 308,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    PAYMENT_REQUIRED = 402,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    METHOD_NOT_ALLOWED = 405,
    NOT_ACCEPTABLE = 406,
    PROXY_AUTHENTICATION_REQUIRED = 407,
    REQUEST_TIMEOUT = 408,
    CONFLICT = 409,
    GONE = 410,
    LENGTH_REQUIRED = 411,
    PRECONDITION_FAILED = 412,
    PAYLOAD_TOO_LARGE = 413,
    URI_TOO_LONG = 414,
    UNSUPPORTED_MEDIA_TYPE = 415,
    RANGE_NOT_SATISFIABLE = 416,
    EXPECTATION_FAILED = 417,
    MISDIRECTED_REQUEST = 421,
    UNPROCESSABLE_ENTITY = 422,
    LOCKED = 423,
    FAILED_DEPENDENCY = 424,
    TOO_EARLY = 425,
    UPGRADE_REQUIRED = 426,
    PRECONDITION_REQUIRED = 428,
    TOO_MANY_REQUESTS = 429,
    REQUEST_HEADER_FIELDS_TOO_LARGE = 431,
    UNAVAILABLE_FOR_LEGAL_REASONS = 451,
    INTERNAL_SERVER_ERROR = 500,
    NOT_IMPLEMENTED = 501,
    BAD_GATEWAY = 502,
    SERVICE_UNAVAILABLE = 503,
    GATEWAY_TIMEOUT = 504,
    HTTP_VERSION_NOT_SUPPORTED = 505,
    VARIANT_ALSO_NEGOTIATES = 506,
    INSUFFICIENT_STORAGE = 507,
    LOOP_DETECTED = 508,
    NOT_EXTENDED = 510,
    NETWORK_AUTHENTICATION_REQUIRED = 511
}