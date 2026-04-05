
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model OtpCode
 * 
 */
export type OtpCode = $Result.DefaultSelection<Prisma.$OtpCodePayload>
/**
 * Model Project
 * 
 */
export type Project = $Result.DefaultSelection<Prisma.$ProjectPayload>
/**
 * Model ApiKey
 * 
 */
export type ApiKey = $Result.DefaultSelection<Prisma.$ApiKeyPayload>
/**
 * Model Endpoint
 * 
 */
export type Endpoint = $Result.DefaultSelection<Prisma.$EndpointPayload>
/**
 * Model UsageLog
 * 
 */
export type UsageLog = $Result.DefaultSelection<Prisma.$UsageLogPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const HttpMethod: {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH',
  OPTIONS: 'OPTIONS',
  HEAD: 'HEAD'
};

export type HttpMethod = (typeof HttpMethod)[keyof typeof HttpMethod]


export const ProjectStatus: {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  ARCHIVED: 'ARCHIVED'
};

export type ProjectStatus = (typeof ProjectStatus)[keyof typeof ProjectStatus]


export const RateLimitStrategy: {
  FIXED_WINDOW: 'FIXED_WINDOW',
  SLIDING_LOG: 'SLIDING_LOG',
  TOKEN_BUCKET: 'TOKEN_BUCKET',
  LEAKY_BUCKET: 'LEAKY_BUCKET'
};

export type RateLimitStrategy = (typeof RateLimitStrategy)[keyof typeof RateLimitStrategy]


export const OtpType: {
  EMAIL_VERIFICATION: 'EMAIL_VERIFICATION',
  PASSWORD_RESET: 'PASSWORD_RESET'
};

export type OtpType = (typeof OtpType)[keyof typeof OtpType]

}

export type HttpMethod = $Enums.HttpMethod

export const HttpMethod: typeof $Enums.HttpMethod

export type ProjectStatus = $Enums.ProjectStatus

export const ProjectStatus: typeof $Enums.ProjectStatus

export type RateLimitStrategy = $Enums.RateLimitStrategy

export const RateLimitStrategy: typeof $Enums.RateLimitStrategy

export type OtpType = $Enums.OtpType

export const OtpType: typeof $Enums.OtpType

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.otpCode`: Exposes CRUD operations for the **OtpCode** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OtpCodes
    * const otpCodes = await prisma.otpCode.findMany()
    * ```
    */
  get otpCode(): Prisma.OtpCodeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.project`: Exposes CRUD operations for the **Project** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Projects
    * const projects = await prisma.project.findMany()
    * ```
    */
  get project(): Prisma.ProjectDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.apiKey`: Exposes CRUD operations for the **ApiKey** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ApiKeys
    * const apiKeys = await prisma.apiKey.findMany()
    * ```
    */
  get apiKey(): Prisma.ApiKeyDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.endpoint`: Exposes CRUD operations for the **Endpoint** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Endpoints
    * const endpoints = await prisma.endpoint.findMany()
    * ```
    */
  get endpoint(): Prisma.EndpointDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.usageLog`: Exposes CRUD operations for the **UsageLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UsageLogs
    * const usageLogs = await prisma.usageLog.findMany()
    * ```
    */
  get usageLog(): Prisma.UsageLogDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.6.0
   * Query Engine version: 75cbdc1eb7150937890ad5465d861175c6624711
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    OtpCode: 'OtpCode',
    Project: 'Project',
    ApiKey: 'ApiKey',
    Endpoint: 'Endpoint',
    UsageLog: 'UsageLog'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "otpCode" | "project" | "apiKey" | "endpoint" | "usageLog"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      OtpCode: {
        payload: Prisma.$OtpCodePayload<ExtArgs>
        fields: Prisma.OtpCodeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OtpCodeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpCodePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OtpCodeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpCodePayload>
          }
          findFirst: {
            args: Prisma.OtpCodeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpCodePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OtpCodeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpCodePayload>
          }
          findMany: {
            args: Prisma.OtpCodeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpCodePayload>[]
          }
          create: {
            args: Prisma.OtpCodeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpCodePayload>
          }
          createMany: {
            args: Prisma.OtpCodeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OtpCodeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpCodePayload>[]
          }
          delete: {
            args: Prisma.OtpCodeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpCodePayload>
          }
          update: {
            args: Prisma.OtpCodeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpCodePayload>
          }
          deleteMany: {
            args: Prisma.OtpCodeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OtpCodeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OtpCodeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpCodePayload>[]
          }
          upsert: {
            args: Prisma.OtpCodeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpCodePayload>
          }
          aggregate: {
            args: Prisma.OtpCodeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOtpCode>
          }
          groupBy: {
            args: Prisma.OtpCodeGroupByArgs<ExtArgs>
            result: $Utils.Optional<OtpCodeGroupByOutputType>[]
          }
          count: {
            args: Prisma.OtpCodeCountArgs<ExtArgs>
            result: $Utils.Optional<OtpCodeCountAggregateOutputType> | number
          }
        }
      }
      Project: {
        payload: Prisma.$ProjectPayload<ExtArgs>
        fields: Prisma.ProjectFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProjectFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProjectFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          findFirst: {
            args: Prisma.ProjectFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProjectFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          findMany: {
            args: Prisma.ProjectFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          create: {
            args: Prisma.ProjectCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          createMany: {
            args: Prisma.ProjectCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProjectCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          delete: {
            args: Prisma.ProjectDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          update: {
            args: Prisma.ProjectUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          deleteMany: {
            args: Prisma.ProjectDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProjectUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProjectUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          upsert: {
            args: Prisma.ProjectUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          aggregate: {
            args: Prisma.ProjectAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProject>
          }
          groupBy: {
            args: Prisma.ProjectGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProjectGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProjectCountArgs<ExtArgs>
            result: $Utils.Optional<ProjectCountAggregateOutputType> | number
          }
        }
      }
      ApiKey: {
        payload: Prisma.$ApiKeyPayload<ExtArgs>
        fields: Prisma.ApiKeyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ApiKeyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ApiKeyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload>
          }
          findFirst: {
            args: Prisma.ApiKeyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ApiKeyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload>
          }
          findMany: {
            args: Prisma.ApiKeyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload>[]
          }
          create: {
            args: Prisma.ApiKeyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload>
          }
          createMany: {
            args: Prisma.ApiKeyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ApiKeyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload>[]
          }
          delete: {
            args: Prisma.ApiKeyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload>
          }
          update: {
            args: Prisma.ApiKeyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload>
          }
          deleteMany: {
            args: Prisma.ApiKeyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ApiKeyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ApiKeyUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload>[]
          }
          upsert: {
            args: Prisma.ApiKeyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload>
          }
          aggregate: {
            args: Prisma.ApiKeyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateApiKey>
          }
          groupBy: {
            args: Prisma.ApiKeyGroupByArgs<ExtArgs>
            result: $Utils.Optional<ApiKeyGroupByOutputType>[]
          }
          count: {
            args: Prisma.ApiKeyCountArgs<ExtArgs>
            result: $Utils.Optional<ApiKeyCountAggregateOutputType> | number
          }
        }
      }
      Endpoint: {
        payload: Prisma.$EndpointPayload<ExtArgs>
        fields: Prisma.EndpointFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EndpointFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EndpointPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EndpointFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EndpointPayload>
          }
          findFirst: {
            args: Prisma.EndpointFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EndpointPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EndpointFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EndpointPayload>
          }
          findMany: {
            args: Prisma.EndpointFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EndpointPayload>[]
          }
          create: {
            args: Prisma.EndpointCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EndpointPayload>
          }
          createMany: {
            args: Prisma.EndpointCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EndpointCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EndpointPayload>[]
          }
          delete: {
            args: Prisma.EndpointDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EndpointPayload>
          }
          update: {
            args: Prisma.EndpointUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EndpointPayload>
          }
          deleteMany: {
            args: Prisma.EndpointDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EndpointUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EndpointUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EndpointPayload>[]
          }
          upsert: {
            args: Prisma.EndpointUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EndpointPayload>
          }
          aggregate: {
            args: Prisma.EndpointAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEndpoint>
          }
          groupBy: {
            args: Prisma.EndpointGroupByArgs<ExtArgs>
            result: $Utils.Optional<EndpointGroupByOutputType>[]
          }
          count: {
            args: Prisma.EndpointCountArgs<ExtArgs>
            result: $Utils.Optional<EndpointCountAggregateOutputType> | number
          }
        }
      }
      UsageLog: {
        payload: Prisma.$UsageLogPayload<ExtArgs>
        fields: Prisma.UsageLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UsageLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UsageLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageLogPayload>
          }
          findFirst: {
            args: Prisma.UsageLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UsageLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageLogPayload>
          }
          findMany: {
            args: Prisma.UsageLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageLogPayload>[]
          }
          create: {
            args: Prisma.UsageLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageLogPayload>
          }
          createMany: {
            args: Prisma.UsageLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UsageLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageLogPayload>[]
          }
          delete: {
            args: Prisma.UsageLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageLogPayload>
          }
          update: {
            args: Prisma.UsageLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageLogPayload>
          }
          deleteMany: {
            args: Prisma.UsageLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UsageLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UsageLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageLogPayload>[]
          }
          upsert: {
            args: Prisma.UsageLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageLogPayload>
          }
          aggregate: {
            args: Prisma.UsageLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUsageLog>
          }
          groupBy: {
            args: Prisma.UsageLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<UsageLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.UsageLogCountArgs<ExtArgs>
            result: $Utils.Optional<UsageLogCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    otpCode?: OtpCodeOmit
    project?: ProjectOmit
    apiKey?: ApiKeyOmit
    endpoint?: EndpointOmit
    usageLog?: UsageLogOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    projects: number
    otpCodes: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    projects?: boolean | UserCountOutputTypeCountProjectsArgs
    otpCodes?: boolean | UserCountOutputTypeCountOtpCodesArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountProjectsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountOtpCodesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OtpCodeWhereInput
  }


  /**
   * Count Type ProjectCountOutputType
   */

  export type ProjectCountOutputType = {
    apiKeys: number
    endpoints: number
    logs: number
  }

  export type ProjectCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    apiKeys?: boolean | ProjectCountOutputTypeCountApiKeysArgs
    endpoints?: boolean | ProjectCountOutputTypeCountEndpointsArgs
    logs?: boolean | ProjectCountOutputTypeCountLogsArgs
  }

  // Custom InputTypes
  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectCountOutputType
     */
    select?: ProjectCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeCountApiKeysArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ApiKeyWhereInput
  }

  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeCountEndpointsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EndpointWhereInput
  }

  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeCountLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UsageLogWhereInput
  }


  /**
   * Count Type EndpointCountOutputType
   */

  export type EndpointCountOutputType = {
    logs: number
  }

  export type EndpointCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    logs?: boolean | EndpointCountOutputTypeCountLogsArgs
  }

  // Custom InputTypes
  /**
   * EndpointCountOutputType without action
   */
  export type EndpointCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EndpointCountOutputType
     */
    select?: EndpointCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * EndpointCountOutputType without action
   */
  export type EndpointCountOutputTypeCountLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UsageLogWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    tokenVersion: number | null
  }

  export type UserSumAggregateOutputType = {
    tokenVersion: number | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    name: string | null
    emailVerified: boolean | null
    tokenVersion: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    name: string | null
    emailVerified: boolean | null
    tokenVersion: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    password: number
    name: number
    emailVerified: number
    tokenVersion: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    tokenVersion?: true
  }

  export type UserSumAggregateInputType = {
    tokenVersion?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    emailVerified?: true
    tokenVersion?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    emailVerified?: true
    tokenVersion?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    emailVerified?: true
    tokenVersion?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    password: string
    name: string | null
    emailVerified: boolean
    tokenVersion: number
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    emailVerified?: boolean
    tokenVersion?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    projects?: boolean | User$projectsArgs<ExtArgs>
    otpCodes?: boolean | User$otpCodesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    emailVerified?: boolean
    tokenVersion?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    emailVerified?: boolean
    tokenVersion?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    emailVerified?: boolean
    tokenVersion?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "password" | "name" | "emailVerified" | "tokenVersion" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    projects?: boolean | User$projectsArgs<ExtArgs>
    otpCodes?: boolean | User$otpCodesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      projects: Prisma.$ProjectPayload<ExtArgs>[]
      otpCodes: Prisma.$OtpCodePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      password: string
      name: string | null
      emailVerified: boolean
      tokenVersion: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    projects<T extends User$projectsArgs<ExtArgs> = {}>(args?: Subset<T, User$projectsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    otpCodes<T extends User$otpCodesArgs<ExtArgs> = {}>(args?: Subset<T, User$otpCodesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OtpCodePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly emailVerified: FieldRef<"User", 'Boolean'>
    readonly tokenVersion: FieldRef<"User", 'Int'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.projects
   */
  export type User$projectsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    where?: ProjectWhereInput
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    cursor?: ProjectWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * User.otpCodes
   */
  export type User$otpCodesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpCode
     */
    select?: OtpCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OtpCode
     */
    omit?: OtpCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OtpCodeInclude<ExtArgs> | null
    where?: OtpCodeWhereInput
    orderBy?: OtpCodeOrderByWithRelationInput | OtpCodeOrderByWithRelationInput[]
    cursor?: OtpCodeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OtpCodeScalarFieldEnum | OtpCodeScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model OtpCode
   */

  export type AggregateOtpCode = {
    _count: OtpCodeCountAggregateOutputType | null
    _min: OtpCodeMinAggregateOutputType | null
    _max: OtpCodeMaxAggregateOutputType | null
  }

  export type OtpCodeMinAggregateOutputType = {
    id: string | null
    userId: string | null
    code: string | null
    type: $Enums.OtpType | null
    expiresAt: Date | null
    usedAt: Date | null
    createdAt: Date | null
  }

  export type OtpCodeMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    code: string | null
    type: $Enums.OtpType | null
    expiresAt: Date | null
    usedAt: Date | null
    createdAt: Date | null
  }

  export type OtpCodeCountAggregateOutputType = {
    id: number
    userId: number
    code: number
    type: number
    expiresAt: number
    usedAt: number
    createdAt: number
    _all: number
  }


  export type OtpCodeMinAggregateInputType = {
    id?: true
    userId?: true
    code?: true
    type?: true
    expiresAt?: true
    usedAt?: true
    createdAt?: true
  }

  export type OtpCodeMaxAggregateInputType = {
    id?: true
    userId?: true
    code?: true
    type?: true
    expiresAt?: true
    usedAt?: true
    createdAt?: true
  }

  export type OtpCodeCountAggregateInputType = {
    id?: true
    userId?: true
    code?: true
    type?: true
    expiresAt?: true
    usedAt?: true
    createdAt?: true
    _all?: true
  }

  export type OtpCodeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OtpCode to aggregate.
     */
    where?: OtpCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OtpCodes to fetch.
     */
    orderBy?: OtpCodeOrderByWithRelationInput | OtpCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OtpCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OtpCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OtpCodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OtpCodes
    **/
    _count?: true | OtpCodeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OtpCodeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OtpCodeMaxAggregateInputType
  }

  export type GetOtpCodeAggregateType<T extends OtpCodeAggregateArgs> = {
        [P in keyof T & keyof AggregateOtpCode]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOtpCode[P]>
      : GetScalarType<T[P], AggregateOtpCode[P]>
  }




  export type OtpCodeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OtpCodeWhereInput
    orderBy?: OtpCodeOrderByWithAggregationInput | OtpCodeOrderByWithAggregationInput[]
    by: OtpCodeScalarFieldEnum[] | OtpCodeScalarFieldEnum
    having?: OtpCodeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OtpCodeCountAggregateInputType | true
    _min?: OtpCodeMinAggregateInputType
    _max?: OtpCodeMaxAggregateInputType
  }

  export type OtpCodeGroupByOutputType = {
    id: string
    userId: string
    code: string
    type: $Enums.OtpType
    expiresAt: Date
    usedAt: Date | null
    createdAt: Date
    _count: OtpCodeCountAggregateOutputType | null
    _min: OtpCodeMinAggregateOutputType | null
    _max: OtpCodeMaxAggregateOutputType | null
  }

  type GetOtpCodeGroupByPayload<T extends OtpCodeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OtpCodeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OtpCodeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OtpCodeGroupByOutputType[P]>
            : GetScalarType<T[P], OtpCodeGroupByOutputType[P]>
        }
      >
    >


  export type OtpCodeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    code?: boolean
    type?: boolean
    expiresAt?: boolean
    usedAt?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["otpCode"]>

  export type OtpCodeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    code?: boolean
    type?: boolean
    expiresAt?: boolean
    usedAt?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["otpCode"]>

  export type OtpCodeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    code?: boolean
    type?: boolean
    expiresAt?: boolean
    usedAt?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["otpCode"]>

  export type OtpCodeSelectScalar = {
    id?: boolean
    userId?: boolean
    code?: boolean
    type?: boolean
    expiresAt?: boolean
    usedAt?: boolean
    createdAt?: boolean
  }

  export type OtpCodeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "code" | "type" | "expiresAt" | "usedAt" | "createdAt", ExtArgs["result"]["otpCode"]>
  export type OtpCodeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type OtpCodeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type OtpCodeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $OtpCodePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OtpCode"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      code: string
      type: $Enums.OtpType
      expiresAt: Date
      usedAt: Date | null
      createdAt: Date
    }, ExtArgs["result"]["otpCode"]>
    composites: {}
  }

  type OtpCodeGetPayload<S extends boolean | null | undefined | OtpCodeDefaultArgs> = $Result.GetResult<Prisma.$OtpCodePayload, S>

  type OtpCodeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OtpCodeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OtpCodeCountAggregateInputType | true
    }

  export interface OtpCodeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OtpCode'], meta: { name: 'OtpCode' } }
    /**
     * Find zero or one OtpCode that matches the filter.
     * @param {OtpCodeFindUniqueArgs} args - Arguments to find a OtpCode
     * @example
     * // Get one OtpCode
     * const otpCode = await prisma.otpCode.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OtpCodeFindUniqueArgs>(args: SelectSubset<T, OtpCodeFindUniqueArgs<ExtArgs>>): Prisma__OtpCodeClient<$Result.GetResult<Prisma.$OtpCodePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one OtpCode that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OtpCodeFindUniqueOrThrowArgs} args - Arguments to find a OtpCode
     * @example
     * // Get one OtpCode
     * const otpCode = await prisma.otpCode.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OtpCodeFindUniqueOrThrowArgs>(args: SelectSubset<T, OtpCodeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OtpCodeClient<$Result.GetResult<Prisma.$OtpCodePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OtpCode that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OtpCodeFindFirstArgs} args - Arguments to find a OtpCode
     * @example
     * // Get one OtpCode
     * const otpCode = await prisma.otpCode.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OtpCodeFindFirstArgs>(args?: SelectSubset<T, OtpCodeFindFirstArgs<ExtArgs>>): Prisma__OtpCodeClient<$Result.GetResult<Prisma.$OtpCodePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OtpCode that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OtpCodeFindFirstOrThrowArgs} args - Arguments to find a OtpCode
     * @example
     * // Get one OtpCode
     * const otpCode = await prisma.otpCode.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OtpCodeFindFirstOrThrowArgs>(args?: SelectSubset<T, OtpCodeFindFirstOrThrowArgs<ExtArgs>>): Prisma__OtpCodeClient<$Result.GetResult<Prisma.$OtpCodePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OtpCodes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OtpCodeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OtpCodes
     * const otpCodes = await prisma.otpCode.findMany()
     * 
     * // Get first 10 OtpCodes
     * const otpCodes = await prisma.otpCode.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const otpCodeWithIdOnly = await prisma.otpCode.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OtpCodeFindManyArgs>(args?: SelectSubset<T, OtpCodeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OtpCodePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a OtpCode.
     * @param {OtpCodeCreateArgs} args - Arguments to create a OtpCode.
     * @example
     * // Create one OtpCode
     * const OtpCode = await prisma.otpCode.create({
     *   data: {
     *     // ... data to create a OtpCode
     *   }
     * })
     * 
     */
    create<T extends OtpCodeCreateArgs>(args: SelectSubset<T, OtpCodeCreateArgs<ExtArgs>>): Prisma__OtpCodeClient<$Result.GetResult<Prisma.$OtpCodePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many OtpCodes.
     * @param {OtpCodeCreateManyArgs} args - Arguments to create many OtpCodes.
     * @example
     * // Create many OtpCodes
     * const otpCode = await prisma.otpCode.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OtpCodeCreateManyArgs>(args?: SelectSubset<T, OtpCodeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many OtpCodes and returns the data saved in the database.
     * @param {OtpCodeCreateManyAndReturnArgs} args - Arguments to create many OtpCodes.
     * @example
     * // Create many OtpCodes
     * const otpCode = await prisma.otpCode.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many OtpCodes and only return the `id`
     * const otpCodeWithIdOnly = await prisma.otpCode.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OtpCodeCreateManyAndReturnArgs>(args?: SelectSubset<T, OtpCodeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OtpCodePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a OtpCode.
     * @param {OtpCodeDeleteArgs} args - Arguments to delete one OtpCode.
     * @example
     * // Delete one OtpCode
     * const OtpCode = await prisma.otpCode.delete({
     *   where: {
     *     // ... filter to delete one OtpCode
     *   }
     * })
     * 
     */
    delete<T extends OtpCodeDeleteArgs>(args: SelectSubset<T, OtpCodeDeleteArgs<ExtArgs>>): Prisma__OtpCodeClient<$Result.GetResult<Prisma.$OtpCodePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one OtpCode.
     * @param {OtpCodeUpdateArgs} args - Arguments to update one OtpCode.
     * @example
     * // Update one OtpCode
     * const otpCode = await prisma.otpCode.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OtpCodeUpdateArgs>(args: SelectSubset<T, OtpCodeUpdateArgs<ExtArgs>>): Prisma__OtpCodeClient<$Result.GetResult<Prisma.$OtpCodePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more OtpCodes.
     * @param {OtpCodeDeleteManyArgs} args - Arguments to filter OtpCodes to delete.
     * @example
     * // Delete a few OtpCodes
     * const { count } = await prisma.otpCode.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OtpCodeDeleteManyArgs>(args?: SelectSubset<T, OtpCodeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OtpCodes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OtpCodeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OtpCodes
     * const otpCode = await prisma.otpCode.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OtpCodeUpdateManyArgs>(args: SelectSubset<T, OtpCodeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OtpCodes and returns the data updated in the database.
     * @param {OtpCodeUpdateManyAndReturnArgs} args - Arguments to update many OtpCodes.
     * @example
     * // Update many OtpCodes
     * const otpCode = await prisma.otpCode.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more OtpCodes and only return the `id`
     * const otpCodeWithIdOnly = await prisma.otpCode.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OtpCodeUpdateManyAndReturnArgs>(args: SelectSubset<T, OtpCodeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OtpCodePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one OtpCode.
     * @param {OtpCodeUpsertArgs} args - Arguments to update or create a OtpCode.
     * @example
     * // Update or create a OtpCode
     * const otpCode = await prisma.otpCode.upsert({
     *   create: {
     *     // ... data to create a OtpCode
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OtpCode we want to update
     *   }
     * })
     */
    upsert<T extends OtpCodeUpsertArgs>(args: SelectSubset<T, OtpCodeUpsertArgs<ExtArgs>>): Prisma__OtpCodeClient<$Result.GetResult<Prisma.$OtpCodePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of OtpCodes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OtpCodeCountArgs} args - Arguments to filter OtpCodes to count.
     * @example
     * // Count the number of OtpCodes
     * const count = await prisma.otpCode.count({
     *   where: {
     *     // ... the filter for the OtpCodes we want to count
     *   }
     * })
    **/
    count<T extends OtpCodeCountArgs>(
      args?: Subset<T, OtpCodeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OtpCodeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OtpCode.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OtpCodeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OtpCodeAggregateArgs>(args: Subset<T, OtpCodeAggregateArgs>): Prisma.PrismaPromise<GetOtpCodeAggregateType<T>>

    /**
     * Group by OtpCode.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OtpCodeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OtpCodeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OtpCodeGroupByArgs['orderBy'] }
        : { orderBy?: OtpCodeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OtpCodeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOtpCodeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OtpCode model
   */
  readonly fields: OtpCodeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OtpCode.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OtpCodeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the OtpCode model
   */
  interface OtpCodeFieldRefs {
    readonly id: FieldRef<"OtpCode", 'String'>
    readonly userId: FieldRef<"OtpCode", 'String'>
    readonly code: FieldRef<"OtpCode", 'String'>
    readonly type: FieldRef<"OtpCode", 'OtpType'>
    readonly expiresAt: FieldRef<"OtpCode", 'DateTime'>
    readonly usedAt: FieldRef<"OtpCode", 'DateTime'>
    readonly createdAt: FieldRef<"OtpCode", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * OtpCode findUnique
   */
  export type OtpCodeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpCode
     */
    select?: OtpCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OtpCode
     */
    omit?: OtpCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OtpCodeInclude<ExtArgs> | null
    /**
     * Filter, which OtpCode to fetch.
     */
    where: OtpCodeWhereUniqueInput
  }

  /**
   * OtpCode findUniqueOrThrow
   */
  export type OtpCodeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpCode
     */
    select?: OtpCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OtpCode
     */
    omit?: OtpCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OtpCodeInclude<ExtArgs> | null
    /**
     * Filter, which OtpCode to fetch.
     */
    where: OtpCodeWhereUniqueInput
  }

  /**
   * OtpCode findFirst
   */
  export type OtpCodeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpCode
     */
    select?: OtpCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OtpCode
     */
    omit?: OtpCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OtpCodeInclude<ExtArgs> | null
    /**
     * Filter, which OtpCode to fetch.
     */
    where?: OtpCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OtpCodes to fetch.
     */
    orderBy?: OtpCodeOrderByWithRelationInput | OtpCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OtpCodes.
     */
    cursor?: OtpCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OtpCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OtpCodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OtpCodes.
     */
    distinct?: OtpCodeScalarFieldEnum | OtpCodeScalarFieldEnum[]
  }

  /**
   * OtpCode findFirstOrThrow
   */
  export type OtpCodeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpCode
     */
    select?: OtpCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OtpCode
     */
    omit?: OtpCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OtpCodeInclude<ExtArgs> | null
    /**
     * Filter, which OtpCode to fetch.
     */
    where?: OtpCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OtpCodes to fetch.
     */
    orderBy?: OtpCodeOrderByWithRelationInput | OtpCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OtpCodes.
     */
    cursor?: OtpCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OtpCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OtpCodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OtpCodes.
     */
    distinct?: OtpCodeScalarFieldEnum | OtpCodeScalarFieldEnum[]
  }

  /**
   * OtpCode findMany
   */
  export type OtpCodeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpCode
     */
    select?: OtpCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OtpCode
     */
    omit?: OtpCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OtpCodeInclude<ExtArgs> | null
    /**
     * Filter, which OtpCodes to fetch.
     */
    where?: OtpCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OtpCodes to fetch.
     */
    orderBy?: OtpCodeOrderByWithRelationInput | OtpCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OtpCodes.
     */
    cursor?: OtpCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OtpCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OtpCodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OtpCodes.
     */
    distinct?: OtpCodeScalarFieldEnum | OtpCodeScalarFieldEnum[]
  }

  /**
   * OtpCode create
   */
  export type OtpCodeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpCode
     */
    select?: OtpCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OtpCode
     */
    omit?: OtpCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OtpCodeInclude<ExtArgs> | null
    /**
     * The data needed to create a OtpCode.
     */
    data: XOR<OtpCodeCreateInput, OtpCodeUncheckedCreateInput>
  }

  /**
   * OtpCode createMany
   */
  export type OtpCodeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OtpCodes.
     */
    data: OtpCodeCreateManyInput | OtpCodeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OtpCode createManyAndReturn
   */
  export type OtpCodeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpCode
     */
    select?: OtpCodeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OtpCode
     */
    omit?: OtpCodeOmit<ExtArgs> | null
    /**
     * The data used to create many OtpCodes.
     */
    data: OtpCodeCreateManyInput | OtpCodeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OtpCodeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * OtpCode update
   */
  export type OtpCodeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpCode
     */
    select?: OtpCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OtpCode
     */
    omit?: OtpCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OtpCodeInclude<ExtArgs> | null
    /**
     * The data needed to update a OtpCode.
     */
    data: XOR<OtpCodeUpdateInput, OtpCodeUncheckedUpdateInput>
    /**
     * Choose, which OtpCode to update.
     */
    where: OtpCodeWhereUniqueInput
  }

  /**
   * OtpCode updateMany
   */
  export type OtpCodeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OtpCodes.
     */
    data: XOR<OtpCodeUpdateManyMutationInput, OtpCodeUncheckedUpdateManyInput>
    /**
     * Filter which OtpCodes to update
     */
    where?: OtpCodeWhereInput
    /**
     * Limit how many OtpCodes to update.
     */
    limit?: number
  }

  /**
   * OtpCode updateManyAndReturn
   */
  export type OtpCodeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpCode
     */
    select?: OtpCodeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OtpCode
     */
    omit?: OtpCodeOmit<ExtArgs> | null
    /**
     * The data used to update OtpCodes.
     */
    data: XOR<OtpCodeUpdateManyMutationInput, OtpCodeUncheckedUpdateManyInput>
    /**
     * Filter which OtpCodes to update
     */
    where?: OtpCodeWhereInput
    /**
     * Limit how many OtpCodes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OtpCodeIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * OtpCode upsert
   */
  export type OtpCodeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpCode
     */
    select?: OtpCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OtpCode
     */
    omit?: OtpCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OtpCodeInclude<ExtArgs> | null
    /**
     * The filter to search for the OtpCode to update in case it exists.
     */
    where: OtpCodeWhereUniqueInput
    /**
     * In case the OtpCode found by the `where` argument doesn't exist, create a new OtpCode with this data.
     */
    create: XOR<OtpCodeCreateInput, OtpCodeUncheckedCreateInput>
    /**
     * In case the OtpCode was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OtpCodeUpdateInput, OtpCodeUncheckedUpdateInput>
  }

  /**
   * OtpCode delete
   */
  export type OtpCodeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpCode
     */
    select?: OtpCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OtpCode
     */
    omit?: OtpCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OtpCodeInclude<ExtArgs> | null
    /**
     * Filter which OtpCode to delete.
     */
    where: OtpCodeWhereUniqueInput
  }

  /**
   * OtpCode deleteMany
   */
  export type OtpCodeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OtpCodes to delete
     */
    where?: OtpCodeWhereInput
    /**
     * Limit how many OtpCodes to delete.
     */
    limit?: number
  }

  /**
   * OtpCode without action
   */
  export type OtpCodeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpCode
     */
    select?: OtpCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OtpCode
     */
    omit?: OtpCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OtpCodeInclude<ExtArgs> | null
  }


  /**
   * Model Project
   */

  export type AggregateProject = {
    _count: ProjectCountAggregateOutputType | null
    _avg: ProjectAvgAggregateOutputType | null
    _sum: ProjectSumAggregateOutputType | null
    _min: ProjectMinAggregateOutputType | null
    _max: ProjectMaxAggregateOutputType | null
  }

  export type ProjectAvgAggregateOutputType = {
    defaultRateLimitMax: number | null
    defaultRateLimitWindow: number | null
  }

  export type ProjectSumAggregateOutputType = {
    defaultRateLimitMax: number | null
    defaultRateLimitWindow: number | null
  }

  export type ProjectMinAggregateOutputType = {
    id: string | null
    userId: string | null
    name: string | null
    description: string | null
    status: $Enums.ProjectStatus | null
    defaultRateLimitMax: number | null
    defaultRateLimitWindow: number | null
    defaultRateLimitStrategy: $Enums.RateLimitStrategy | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProjectMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    name: string | null
    description: string | null
    status: $Enums.ProjectStatus | null
    defaultRateLimitMax: number | null
    defaultRateLimitWindow: number | null
    defaultRateLimitStrategy: $Enums.RateLimitStrategy | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProjectCountAggregateOutputType = {
    id: number
    userId: number
    name: number
    description: number
    status: number
    defaultRateLimitMax: number
    defaultRateLimitWindow: number
    defaultRateLimitStrategy: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProjectAvgAggregateInputType = {
    defaultRateLimitMax?: true
    defaultRateLimitWindow?: true
  }

  export type ProjectSumAggregateInputType = {
    defaultRateLimitMax?: true
    defaultRateLimitWindow?: true
  }

  export type ProjectMinAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    description?: true
    status?: true
    defaultRateLimitMax?: true
    defaultRateLimitWindow?: true
    defaultRateLimitStrategy?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProjectMaxAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    description?: true
    status?: true
    defaultRateLimitMax?: true
    defaultRateLimitWindow?: true
    defaultRateLimitStrategy?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProjectCountAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    description?: true
    status?: true
    defaultRateLimitMax?: true
    defaultRateLimitWindow?: true
    defaultRateLimitStrategy?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProjectAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Project to aggregate.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Projects
    **/
    _count?: true | ProjectCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProjectAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProjectSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProjectMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProjectMaxAggregateInputType
  }

  export type GetProjectAggregateType<T extends ProjectAggregateArgs> = {
        [P in keyof T & keyof AggregateProject]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProject[P]>
      : GetScalarType<T[P], AggregateProject[P]>
  }




  export type ProjectGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectWhereInput
    orderBy?: ProjectOrderByWithAggregationInput | ProjectOrderByWithAggregationInput[]
    by: ProjectScalarFieldEnum[] | ProjectScalarFieldEnum
    having?: ProjectScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProjectCountAggregateInputType | true
    _avg?: ProjectAvgAggregateInputType
    _sum?: ProjectSumAggregateInputType
    _min?: ProjectMinAggregateInputType
    _max?: ProjectMaxAggregateInputType
  }

  export type ProjectGroupByOutputType = {
    id: string
    userId: string
    name: string
    description: string | null
    status: $Enums.ProjectStatus
    defaultRateLimitMax: number
    defaultRateLimitWindow: number
    defaultRateLimitStrategy: $Enums.RateLimitStrategy
    createdAt: Date
    updatedAt: Date
    _count: ProjectCountAggregateOutputType | null
    _avg: ProjectAvgAggregateOutputType | null
    _sum: ProjectSumAggregateOutputType | null
    _min: ProjectMinAggregateOutputType | null
    _max: ProjectMaxAggregateOutputType | null
  }

  type GetProjectGroupByPayload<T extends ProjectGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProjectGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProjectGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProjectGroupByOutputType[P]>
            : GetScalarType<T[P], ProjectGroupByOutputType[P]>
        }
      >
    >


  export type ProjectSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    description?: boolean
    status?: boolean
    defaultRateLimitMax?: boolean
    defaultRateLimitWindow?: boolean
    defaultRateLimitStrategy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    apiKeys?: boolean | Project$apiKeysArgs<ExtArgs>
    endpoints?: boolean | Project$endpointsArgs<ExtArgs>
    logs?: boolean | Project$logsArgs<ExtArgs>
    _count?: boolean | ProjectCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    description?: boolean
    status?: boolean
    defaultRateLimitMax?: boolean
    defaultRateLimitWindow?: boolean
    defaultRateLimitStrategy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    description?: boolean
    status?: boolean
    defaultRateLimitMax?: boolean
    defaultRateLimitWindow?: boolean
    defaultRateLimitStrategy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectScalar = {
    id?: boolean
    userId?: boolean
    name?: boolean
    description?: boolean
    status?: boolean
    defaultRateLimitMax?: boolean
    defaultRateLimitWindow?: boolean
    defaultRateLimitStrategy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProjectOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "name" | "description" | "status" | "defaultRateLimitMax" | "defaultRateLimitWindow" | "defaultRateLimitStrategy" | "createdAt" | "updatedAt", ExtArgs["result"]["project"]>
  export type ProjectInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    apiKeys?: boolean | Project$apiKeysArgs<ExtArgs>
    endpoints?: boolean | Project$endpointsArgs<ExtArgs>
    logs?: boolean | Project$logsArgs<ExtArgs>
    _count?: boolean | ProjectCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProjectIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ProjectIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ProjectPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Project"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      apiKeys: Prisma.$ApiKeyPayload<ExtArgs>[]
      endpoints: Prisma.$EndpointPayload<ExtArgs>[]
      logs: Prisma.$UsageLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      name: string
      description: string | null
      status: $Enums.ProjectStatus
      defaultRateLimitMax: number
      defaultRateLimitWindow: number
      defaultRateLimitStrategy: $Enums.RateLimitStrategy
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["project"]>
    composites: {}
  }

  type ProjectGetPayload<S extends boolean | null | undefined | ProjectDefaultArgs> = $Result.GetResult<Prisma.$ProjectPayload, S>

  type ProjectCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProjectFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProjectCountAggregateInputType | true
    }

  export interface ProjectDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Project'], meta: { name: 'Project' } }
    /**
     * Find zero or one Project that matches the filter.
     * @param {ProjectFindUniqueArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProjectFindUniqueArgs>(args: SelectSubset<T, ProjectFindUniqueArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Project that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProjectFindUniqueOrThrowArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProjectFindUniqueOrThrowArgs>(args: SelectSubset<T, ProjectFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Project that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindFirstArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProjectFindFirstArgs>(args?: SelectSubset<T, ProjectFindFirstArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Project that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindFirstOrThrowArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProjectFindFirstOrThrowArgs>(args?: SelectSubset<T, ProjectFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Projects that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Projects
     * const projects = await prisma.project.findMany()
     * 
     * // Get first 10 Projects
     * const projects = await prisma.project.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const projectWithIdOnly = await prisma.project.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProjectFindManyArgs>(args?: SelectSubset<T, ProjectFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Project.
     * @param {ProjectCreateArgs} args - Arguments to create a Project.
     * @example
     * // Create one Project
     * const Project = await prisma.project.create({
     *   data: {
     *     // ... data to create a Project
     *   }
     * })
     * 
     */
    create<T extends ProjectCreateArgs>(args: SelectSubset<T, ProjectCreateArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Projects.
     * @param {ProjectCreateManyArgs} args - Arguments to create many Projects.
     * @example
     * // Create many Projects
     * const project = await prisma.project.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProjectCreateManyArgs>(args?: SelectSubset<T, ProjectCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Projects and returns the data saved in the database.
     * @param {ProjectCreateManyAndReturnArgs} args - Arguments to create many Projects.
     * @example
     * // Create many Projects
     * const project = await prisma.project.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Projects and only return the `id`
     * const projectWithIdOnly = await prisma.project.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProjectCreateManyAndReturnArgs>(args?: SelectSubset<T, ProjectCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Project.
     * @param {ProjectDeleteArgs} args - Arguments to delete one Project.
     * @example
     * // Delete one Project
     * const Project = await prisma.project.delete({
     *   where: {
     *     // ... filter to delete one Project
     *   }
     * })
     * 
     */
    delete<T extends ProjectDeleteArgs>(args: SelectSubset<T, ProjectDeleteArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Project.
     * @param {ProjectUpdateArgs} args - Arguments to update one Project.
     * @example
     * // Update one Project
     * const project = await prisma.project.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProjectUpdateArgs>(args: SelectSubset<T, ProjectUpdateArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Projects.
     * @param {ProjectDeleteManyArgs} args - Arguments to filter Projects to delete.
     * @example
     * // Delete a few Projects
     * const { count } = await prisma.project.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProjectDeleteManyArgs>(args?: SelectSubset<T, ProjectDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Projects
     * const project = await prisma.project.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProjectUpdateManyArgs>(args: SelectSubset<T, ProjectUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Projects and returns the data updated in the database.
     * @param {ProjectUpdateManyAndReturnArgs} args - Arguments to update many Projects.
     * @example
     * // Update many Projects
     * const project = await prisma.project.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Projects and only return the `id`
     * const projectWithIdOnly = await prisma.project.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProjectUpdateManyAndReturnArgs>(args: SelectSubset<T, ProjectUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Project.
     * @param {ProjectUpsertArgs} args - Arguments to update or create a Project.
     * @example
     * // Update or create a Project
     * const project = await prisma.project.upsert({
     *   create: {
     *     // ... data to create a Project
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Project we want to update
     *   }
     * })
     */
    upsert<T extends ProjectUpsertArgs>(args: SelectSubset<T, ProjectUpsertArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectCountArgs} args - Arguments to filter Projects to count.
     * @example
     * // Count the number of Projects
     * const count = await prisma.project.count({
     *   where: {
     *     // ... the filter for the Projects we want to count
     *   }
     * })
    **/
    count<T extends ProjectCountArgs>(
      args?: Subset<T, ProjectCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProjectCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Project.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProjectAggregateArgs>(args: Subset<T, ProjectAggregateArgs>): Prisma.PrismaPromise<GetProjectAggregateType<T>>

    /**
     * Group by Project.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProjectGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProjectGroupByArgs['orderBy'] }
        : { orderBy?: ProjectGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProjectGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProjectGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Project model
   */
  readonly fields: ProjectFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Project.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProjectClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    apiKeys<T extends Project$apiKeysArgs<ExtArgs> = {}>(args?: Subset<T, Project$apiKeysArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    endpoints<T extends Project$endpointsArgs<ExtArgs> = {}>(args?: Subset<T, Project$endpointsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EndpointPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    logs<T extends Project$logsArgs<ExtArgs> = {}>(args?: Subset<T, Project$logsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsageLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Project model
   */
  interface ProjectFieldRefs {
    readonly id: FieldRef<"Project", 'String'>
    readonly userId: FieldRef<"Project", 'String'>
    readonly name: FieldRef<"Project", 'String'>
    readonly description: FieldRef<"Project", 'String'>
    readonly status: FieldRef<"Project", 'ProjectStatus'>
    readonly defaultRateLimitMax: FieldRef<"Project", 'Int'>
    readonly defaultRateLimitWindow: FieldRef<"Project", 'Int'>
    readonly defaultRateLimitStrategy: FieldRef<"Project", 'RateLimitStrategy'>
    readonly createdAt: FieldRef<"Project", 'DateTime'>
    readonly updatedAt: FieldRef<"Project", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Project findUnique
   */
  export type ProjectFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project findUniqueOrThrow
   */
  export type ProjectFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project findFirst
   */
  export type ProjectFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projects.
     */
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project findFirstOrThrow
   */
  export type ProjectFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projects.
     */
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project findMany
   */
  export type ProjectFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Projects to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projects.
     */
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project create
   */
  export type ProjectCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The data needed to create a Project.
     */
    data: XOR<ProjectCreateInput, ProjectUncheckedCreateInput>
  }

  /**
   * Project createMany
   */
  export type ProjectCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Projects.
     */
    data: ProjectCreateManyInput | ProjectCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Project createManyAndReturn
   */
  export type ProjectCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * The data used to create many Projects.
     */
    data: ProjectCreateManyInput | ProjectCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Project update
   */
  export type ProjectUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The data needed to update a Project.
     */
    data: XOR<ProjectUpdateInput, ProjectUncheckedUpdateInput>
    /**
     * Choose, which Project to update.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project updateMany
   */
  export type ProjectUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Projects.
     */
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyInput>
    /**
     * Filter which Projects to update
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to update.
     */
    limit?: number
  }

  /**
   * Project updateManyAndReturn
   */
  export type ProjectUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * The data used to update Projects.
     */
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyInput>
    /**
     * Filter which Projects to update
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Project upsert
   */
  export type ProjectUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The filter to search for the Project to update in case it exists.
     */
    where: ProjectWhereUniqueInput
    /**
     * In case the Project found by the `where` argument doesn't exist, create a new Project with this data.
     */
    create: XOR<ProjectCreateInput, ProjectUncheckedCreateInput>
    /**
     * In case the Project was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProjectUpdateInput, ProjectUncheckedUpdateInput>
  }

  /**
   * Project delete
   */
  export type ProjectDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter which Project to delete.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project deleteMany
   */
  export type ProjectDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Projects to delete
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to delete.
     */
    limit?: number
  }

  /**
   * Project.apiKeys
   */
  export type Project$apiKeysArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKey
     */
    omit?: ApiKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyInclude<ExtArgs> | null
    where?: ApiKeyWhereInput
    orderBy?: ApiKeyOrderByWithRelationInput | ApiKeyOrderByWithRelationInput[]
    cursor?: ApiKeyWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ApiKeyScalarFieldEnum | ApiKeyScalarFieldEnum[]
  }

  /**
   * Project.endpoints
   */
  export type Project$endpointsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Endpoint
     */
    select?: EndpointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Endpoint
     */
    omit?: EndpointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EndpointInclude<ExtArgs> | null
    where?: EndpointWhereInput
    orderBy?: EndpointOrderByWithRelationInput | EndpointOrderByWithRelationInput[]
    cursor?: EndpointWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EndpointScalarFieldEnum | EndpointScalarFieldEnum[]
  }

  /**
   * Project.logs
   */
  export type Project$logsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageLog
     */
    select?: UsageLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsageLog
     */
    omit?: UsageLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageLogInclude<ExtArgs> | null
    where?: UsageLogWhereInput
    orderBy?: UsageLogOrderByWithRelationInput | UsageLogOrderByWithRelationInput[]
    cursor?: UsageLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UsageLogScalarFieldEnum | UsageLogScalarFieldEnum[]
  }

  /**
   * Project without action
   */
  export type ProjectDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
  }


  /**
   * Model ApiKey
   */

  export type AggregateApiKey = {
    _count: ApiKeyCountAggregateOutputType | null
    _min: ApiKeyMinAggregateOutputType | null
    _max: ApiKeyMaxAggregateOutputType | null
  }

  export type ApiKeyMinAggregateOutputType = {
    id: string | null
    projectId: string | null
    name: string | null
    keyHash: string | null
    keyPrefix: string | null
    lastUsedAt: Date | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ApiKeyMaxAggregateOutputType = {
    id: string | null
    projectId: string | null
    name: string | null
    keyHash: string | null
    keyPrefix: string | null
    lastUsedAt: Date | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ApiKeyCountAggregateOutputType = {
    id: number
    projectId: number
    name: number
    keyHash: number
    keyPrefix: number
    lastUsedAt: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ApiKeyMinAggregateInputType = {
    id?: true
    projectId?: true
    name?: true
    keyHash?: true
    keyPrefix?: true
    lastUsedAt?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ApiKeyMaxAggregateInputType = {
    id?: true
    projectId?: true
    name?: true
    keyHash?: true
    keyPrefix?: true
    lastUsedAt?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ApiKeyCountAggregateInputType = {
    id?: true
    projectId?: true
    name?: true
    keyHash?: true
    keyPrefix?: true
    lastUsedAt?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ApiKeyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ApiKey to aggregate.
     */
    where?: ApiKeyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApiKeys to fetch.
     */
    orderBy?: ApiKeyOrderByWithRelationInput | ApiKeyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ApiKeyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApiKeys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApiKeys.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ApiKeys
    **/
    _count?: true | ApiKeyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ApiKeyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ApiKeyMaxAggregateInputType
  }

  export type GetApiKeyAggregateType<T extends ApiKeyAggregateArgs> = {
        [P in keyof T & keyof AggregateApiKey]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateApiKey[P]>
      : GetScalarType<T[P], AggregateApiKey[P]>
  }




  export type ApiKeyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ApiKeyWhereInput
    orderBy?: ApiKeyOrderByWithAggregationInput | ApiKeyOrderByWithAggregationInput[]
    by: ApiKeyScalarFieldEnum[] | ApiKeyScalarFieldEnum
    having?: ApiKeyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ApiKeyCountAggregateInputType | true
    _min?: ApiKeyMinAggregateInputType
    _max?: ApiKeyMaxAggregateInputType
  }

  export type ApiKeyGroupByOutputType = {
    id: string
    projectId: string
    name: string
    keyHash: string
    keyPrefix: string
    lastUsedAt: Date | null
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: ApiKeyCountAggregateOutputType | null
    _min: ApiKeyMinAggregateOutputType | null
    _max: ApiKeyMaxAggregateOutputType | null
  }

  type GetApiKeyGroupByPayload<T extends ApiKeyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ApiKeyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ApiKeyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ApiKeyGroupByOutputType[P]>
            : GetScalarType<T[P], ApiKeyGroupByOutputType[P]>
        }
      >
    >


  export type ApiKeySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    name?: boolean
    keyHash?: boolean
    keyPrefix?: boolean
    lastUsedAt?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["apiKey"]>

  export type ApiKeySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    name?: boolean
    keyHash?: boolean
    keyPrefix?: boolean
    lastUsedAt?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["apiKey"]>

  export type ApiKeySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    name?: boolean
    keyHash?: boolean
    keyPrefix?: boolean
    lastUsedAt?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["apiKey"]>

  export type ApiKeySelectScalar = {
    id?: boolean
    projectId?: boolean
    name?: boolean
    keyHash?: boolean
    keyPrefix?: boolean
    lastUsedAt?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ApiKeyOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "projectId" | "name" | "keyHash" | "keyPrefix" | "lastUsedAt" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["apiKey"]>
  export type ApiKeyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }
  export type ApiKeyIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }
  export type ApiKeyIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }

  export type $ApiKeyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ApiKey"
    objects: {
      project: Prisma.$ProjectPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      projectId: string
      name: string
      keyHash: string
      keyPrefix: string
      lastUsedAt: Date | null
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["apiKey"]>
    composites: {}
  }

  type ApiKeyGetPayload<S extends boolean | null | undefined | ApiKeyDefaultArgs> = $Result.GetResult<Prisma.$ApiKeyPayload, S>

  type ApiKeyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ApiKeyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ApiKeyCountAggregateInputType | true
    }

  export interface ApiKeyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ApiKey'], meta: { name: 'ApiKey' } }
    /**
     * Find zero or one ApiKey that matches the filter.
     * @param {ApiKeyFindUniqueArgs} args - Arguments to find a ApiKey
     * @example
     * // Get one ApiKey
     * const apiKey = await prisma.apiKey.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ApiKeyFindUniqueArgs>(args: SelectSubset<T, ApiKeyFindUniqueArgs<ExtArgs>>): Prisma__ApiKeyClient<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ApiKey that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ApiKeyFindUniqueOrThrowArgs} args - Arguments to find a ApiKey
     * @example
     * // Get one ApiKey
     * const apiKey = await prisma.apiKey.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ApiKeyFindUniqueOrThrowArgs>(args: SelectSubset<T, ApiKeyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ApiKeyClient<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ApiKey that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiKeyFindFirstArgs} args - Arguments to find a ApiKey
     * @example
     * // Get one ApiKey
     * const apiKey = await prisma.apiKey.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ApiKeyFindFirstArgs>(args?: SelectSubset<T, ApiKeyFindFirstArgs<ExtArgs>>): Prisma__ApiKeyClient<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ApiKey that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiKeyFindFirstOrThrowArgs} args - Arguments to find a ApiKey
     * @example
     * // Get one ApiKey
     * const apiKey = await prisma.apiKey.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ApiKeyFindFirstOrThrowArgs>(args?: SelectSubset<T, ApiKeyFindFirstOrThrowArgs<ExtArgs>>): Prisma__ApiKeyClient<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ApiKeys that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiKeyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ApiKeys
     * const apiKeys = await prisma.apiKey.findMany()
     * 
     * // Get first 10 ApiKeys
     * const apiKeys = await prisma.apiKey.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const apiKeyWithIdOnly = await prisma.apiKey.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ApiKeyFindManyArgs>(args?: SelectSubset<T, ApiKeyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ApiKey.
     * @param {ApiKeyCreateArgs} args - Arguments to create a ApiKey.
     * @example
     * // Create one ApiKey
     * const ApiKey = await prisma.apiKey.create({
     *   data: {
     *     // ... data to create a ApiKey
     *   }
     * })
     * 
     */
    create<T extends ApiKeyCreateArgs>(args: SelectSubset<T, ApiKeyCreateArgs<ExtArgs>>): Prisma__ApiKeyClient<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ApiKeys.
     * @param {ApiKeyCreateManyArgs} args - Arguments to create many ApiKeys.
     * @example
     * // Create many ApiKeys
     * const apiKey = await prisma.apiKey.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ApiKeyCreateManyArgs>(args?: SelectSubset<T, ApiKeyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ApiKeys and returns the data saved in the database.
     * @param {ApiKeyCreateManyAndReturnArgs} args - Arguments to create many ApiKeys.
     * @example
     * // Create many ApiKeys
     * const apiKey = await prisma.apiKey.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ApiKeys and only return the `id`
     * const apiKeyWithIdOnly = await prisma.apiKey.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ApiKeyCreateManyAndReturnArgs>(args?: SelectSubset<T, ApiKeyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ApiKey.
     * @param {ApiKeyDeleteArgs} args - Arguments to delete one ApiKey.
     * @example
     * // Delete one ApiKey
     * const ApiKey = await prisma.apiKey.delete({
     *   where: {
     *     // ... filter to delete one ApiKey
     *   }
     * })
     * 
     */
    delete<T extends ApiKeyDeleteArgs>(args: SelectSubset<T, ApiKeyDeleteArgs<ExtArgs>>): Prisma__ApiKeyClient<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ApiKey.
     * @param {ApiKeyUpdateArgs} args - Arguments to update one ApiKey.
     * @example
     * // Update one ApiKey
     * const apiKey = await prisma.apiKey.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ApiKeyUpdateArgs>(args: SelectSubset<T, ApiKeyUpdateArgs<ExtArgs>>): Prisma__ApiKeyClient<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ApiKeys.
     * @param {ApiKeyDeleteManyArgs} args - Arguments to filter ApiKeys to delete.
     * @example
     * // Delete a few ApiKeys
     * const { count } = await prisma.apiKey.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ApiKeyDeleteManyArgs>(args?: SelectSubset<T, ApiKeyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ApiKeys.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiKeyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ApiKeys
     * const apiKey = await prisma.apiKey.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ApiKeyUpdateManyArgs>(args: SelectSubset<T, ApiKeyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ApiKeys and returns the data updated in the database.
     * @param {ApiKeyUpdateManyAndReturnArgs} args - Arguments to update many ApiKeys.
     * @example
     * // Update many ApiKeys
     * const apiKey = await prisma.apiKey.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ApiKeys and only return the `id`
     * const apiKeyWithIdOnly = await prisma.apiKey.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ApiKeyUpdateManyAndReturnArgs>(args: SelectSubset<T, ApiKeyUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ApiKey.
     * @param {ApiKeyUpsertArgs} args - Arguments to update or create a ApiKey.
     * @example
     * // Update or create a ApiKey
     * const apiKey = await prisma.apiKey.upsert({
     *   create: {
     *     // ... data to create a ApiKey
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ApiKey we want to update
     *   }
     * })
     */
    upsert<T extends ApiKeyUpsertArgs>(args: SelectSubset<T, ApiKeyUpsertArgs<ExtArgs>>): Prisma__ApiKeyClient<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ApiKeys.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiKeyCountArgs} args - Arguments to filter ApiKeys to count.
     * @example
     * // Count the number of ApiKeys
     * const count = await prisma.apiKey.count({
     *   where: {
     *     // ... the filter for the ApiKeys we want to count
     *   }
     * })
    **/
    count<T extends ApiKeyCountArgs>(
      args?: Subset<T, ApiKeyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ApiKeyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ApiKey.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiKeyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ApiKeyAggregateArgs>(args: Subset<T, ApiKeyAggregateArgs>): Prisma.PrismaPromise<GetApiKeyAggregateType<T>>

    /**
     * Group by ApiKey.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiKeyGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ApiKeyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ApiKeyGroupByArgs['orderBy'] }
        : { orderBy?: ApiKeyGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ApiKeyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetApiKeyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ApiKey model
   */
  readonly fields: ApiKeyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ApiKey.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ApiKeyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    project<T extends ProjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProjectDefaultArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ApiKey model
   */
  interface ApiKeyFieldRefs {
    readonly id: FieldRef<"ApiKey", 'String'>
    readonly projectId: FieldRef<"ApiKey", 'String'>
    readonly name: FieldRef<"ApiKey", 'String'>
    readonly keyHash: FieldRef<"ApiKey", 'String'>
    readonly keyPrefix: FieldRef<"ApiKey", 'String'>
    readonly lastUsedAt: FieldRef<"ApiKey", 'DateTime'>
    readonly isActive: FieldRef<"ApiKey", 'Boolean'>
    readonly createdAt: FieldRef<"ApiKey", 'DateTime'>
    readonly updatedAt: FieldRef<"ApiKey", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ApiKey findUnique
   */
  export type ApiKeyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKey
     */
    omit?: ApiKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyInclude<ExtArgs> | null
    /**
     * Filter, which ApiKey to fetch.
     */
    where: ApiKeyWhereUniqueInput
  }

  /**
   * ApiKey findUniqueOrThrow
   */
  export type ApiKeyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKey
     */
    omit?: ApiKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyInclude<ExtArgs> | null
    /**
     * Filter, which ApiKey to fetch.
     */
    where: ApiKeyWhereUniqueInput
  }

  /**
   * ApiKey findFirst
   */
  export type ApiKeyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKey
     */
    omit?: ApiKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyInclude<ExtArgs> | null
    /**
     * Filter, which ApiKey to fetch.
     */
    where?: ApiKeyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApiKeys to fetch.
     */
    orderBy?: ApiKeyOrderByWithRelationInput | ApiKeyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ApiKeys.
     */
    cursor?: ApiKeyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApiKeys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApiKeys.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ApiKeys.
     */
    distinct?: ApiKeyScalarFieldEnum | ApiKeyScalarFieldEnum[]
  }

  /**
   * ApiKey findFirstOrThrow
   */
  export type ApiKeyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKey
     */
    omit?: ApiKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyInclude<ExtArgs> | null
    /**
     * Filter, which ApiKey to fetch.
     */
    where?: ApiKeyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApiKeys to fetch.
     */
    orderBy?: ApiKeyOrderByWithRelationInput | ApiKeyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ApiKeys.
     */
    cursor?: ApiKeyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApiKeys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApiKeys.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ApiKeys.
     */
    distinct?: ApiKeyScalarFieldEnum | ApiKeyScalarFieldEnum[]
  }

  /**
   * ApiKey findMany
   */
  export type ApiKeyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKey
     */
    omit?: ApiKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyInclude<ExtArgs> | null
    /**
     * Filter, which ApiKeys to fetch.
     */
    where?: ApiKeyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApiKeys to fetch.
     */
    orderBy?: ApiKeyOrderByWithRelationInput | ApiKeyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ApiKeys.
     */
    cursor?: ApiKeyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApiKeys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApiKeys.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ApiKeys.
     */
    distinct?: ApiKeyScalarFieldEnum | ApiKeyScalarFieldEnum[]
  }

  /**
   * ApiKey create
   */
  export type ApiKeyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKey
     */
    omit?: ApiKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyInclude<ExtArgs> | null
    /**
     * The data needed to create a ApiKey.
     */
    data: XOR<ApiKeyCreateInput, ApiKeyUncheckedCreateInput>
  }

  /**
   * ApiKey createMany
   */
  export type ApiKeyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ApiKeys.
     */
    data: ApiKeyCreateManyInput | ApiKeyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ApiKey createManyAndReturn
   */
  export type ApiKeyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKey
     */
    omit?: ApiKeyOmit<ExtArgs> | null
    /**
     * The data used to create many ApiKeys.
     */
    data: ApiKeyCreateManyInput | ApiKeyCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ApiKey update
   */
  export type ApiKeyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKey
     */
    omit?: ApiKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyInclude<ExtArgs> | null
    /**
     * The data needed to update a ApiKey.
     */
    data: XOR<ApiKeyUpdateInput, ApiKeyUncheckedUpdateInput>
    /**
     * Choose, which ApiKey to update.
     */
    where: ApiKeyWhereUniqueInput
  }

  /**
   * ApiKey updateMany
   */
  export type ApiKeyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ApiKeys.
     */
    data: XOR<ApiKeyUpdateManyMutationInput, ApiKeyUncheckedUpdateManyInput>
    /**
     * Filter which ApiKeys to update
     */
    where?: ApiKeyWhereInput
    /**
     * Limit how many ApiKeys to update.
     */
    limit?: number
  }

  /**
   * ApiKey updateManyAndReturn
   */
  export type ApiKeyUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKey
     */
    omit?: ApiKeyOmit<ExtArgs> | null
    /**
     * The data used to update ApiKeys.
     */
    data: XOR<ApiKeyUpdateManyMutationInput, ApiKeyUncheckedUpdateManyInput>
    /**
     * Filter which ApiKeys to update
     */
    where?: ApiKeyWhereInput
    /**
     * Limit how many ApiKeys to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ApiKey upsert
   */
  export type ApiKeyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKey
     */
    omit?: ApiKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyInclude<ExtArgs> | null
    /**
     * The filter to search for the ApiKey to update in case it exists.
     */
    where: ApiKeyWhereUniqueInput
    /**
     * In case the ApiKey found by the `where` argument doesn't exist, create a new ApiKey with this data.
     */
    create: XOR<ApiKeyCreateInput, ApiKeyUncheckedCreateInput>
    /**
     * In case the ApiKey was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ApiKeyUpdateInput, ApiKeyUncheckedUpdateInput>
  }

  /**
   * ApiKey delete
   */
  export type ApiKeyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKey
     */
    omit?: ApiKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyInclude<ExtArgs> | null
    /**
     * Filter which ApiKey to delete.
     */
    where: ApiKeyWhereUniqueInput
  }

  /**
   * ApiKey deleteMany
   */
  export type ApiKeyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ApiKeys to delete
     */
    where?: ApiKeyWhereInput
    /**
     * Limit how many ApiKeys to delete.
     */
    limit?: number
  }

  /**
   * ApiKey without action
   */
  export type ApiKeyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKey
     */
    omit?: ApiKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyInclude<ExtArgs> | null
  }


  /**
   * Model Endpoint
   */

  export type AggregateEndpoint = {
    _count: EndpointCountAggregateOutputType | null
    _avg: EndpointAvgAggregateOutputType | null
    _sum: EndpointSumAggregateOutputType | null
    _min: EndpointMinAggregateOutputType | null
    _max: EndpointMaxAggregateOutputType | null
  }

  export type EndpointAvgAggregateOutputType = {
    statusCode: number | null
    delayMs: number | null
    rateLimitMax: number | null
    rateLimitWindow: number | null
  }

  export type EndpointSumAggregateOutputType = {
    statusCode: number | null
    delayMs: number | null
    rateLimitMax: number | null
    rateLimitWindow: number | null
  }

  export type EndpointMinAggregateOutputType = {
    id: string | null
    projectId: string | null
    path: string | null
    method: $Enums.HttpMethod | null
    statusCode: number | null
    delayMs: number | null
    rateLimitEnabled: boolean | null
    rateLimitStrategy: $Enums.RateLimitStrategy | null
    rateLimitMax: number | null
    rateLimitWindow: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EndpointMaxAggregateOutputType = {
    id: string | null
    projectId: string | null
    path: string | null
    method: $Enums.HttpMethod | null
    statusCode: number | null
    delayMs: number | null
    rateLimitEnabled: boolean | null
    rateLimitStrategy: $Enums.RateLimitStrategy | null
    rateLimitMax: number | null
    rateLimitWindow: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EndpointCountAggregateOutputType = {
    id: number
    projectId: number
    path: number
    method: number
    responseSchema: number
    statusCode: number
    delayMs: number
    rateLimitEnabled: number
    rateLimitStrategy: number
    rateLimitMax: number
    rateLimitWindow: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type EndpointAvgAggregateInputType = {
    statusCode?: true
    delayMs?: true
    rateLimitMax?: true
    rateLimitWindow?: true
  }

  export type EndpointSumAggregateInputType = {
    statusCode?: true
    delayMs?: true
    rateLimitMax?: true
    rateLimitWindow?: true
  }

  export type EndpointMinAggregateInputType = {
    id?: true
    projectId?: true
    path?: true
    method?: true
    statusCode?: true
    delayMs?: true
    rateLimitEnabled?: true
    rateLimitStrategy?: true
    rateLimitMax?: true
    rateLimitWindow?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EndpointMaxAggregateInputType = {
    id?: true
    projectId?: true
    path?: true
    method?: true
    statusCode?: true
    delayMs?: true
    rateLimitEnabled?: true
    rateLimitStrategy?: true
    rateLimitMax?: true
    rateLimitWindow?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EndpointCountAggregateInputType = {
    id?: true
    projectId?: true
    path?: true
    method?: true
    responseSchema?: true
    statusCode?: true
    delayMs?: true
    rateLimitEnabled?: true
    rateLimitStrategy?: true
    rateLimitMax?: true
    rateLimitWindow?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type EndpointAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Endpoint to aggregate.
     */
    where?: EndpointWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Endpoints to fetch.
     */
    orderBy?: EndpointOrderByWithRelationInput | EndpointOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EndpointWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Endpoints from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Endpoints.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Endpoints
    **/
    _count?: true | EndpointCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EndpointAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EndpointSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EndpointMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EndpointMaxAggregateInputType
  }

  export type GetEndpointAggregateType<T extends EndpointAggregateArgs> = {
        [P in keyof T & keyof AggregateEndpoint]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEndpoint[P]>
      : GetScalarType<T[P], AggregateEndpoint[P]>
  }




  export type EndpointGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EndpointWhereInput
    orderBy?: EndpointOrderByWithAggregationInput | EndpointOrderByWithAggregationInput[]
    by: EndpointScalarFieldEnum[] | EndpointScalarFieldEnum
    having?: EndpointScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EndpointCountAggregateInputType | true
    _avg?: EndpointAvgAggregateInputType
    _sum?: EndpointSumAggregateInputType
    _min?: EndpointMinAggregateInputType
    _max?: EndpointMaxAggregateInputType
  }

  export type EndpointGroupByOutputType = {
    id: string
    projectId: string
    path: string
    method: $Enums.HttpMethod
    responseSchema: JsonValue
    statusCode: number
    delayMs: number
    rateLimitEnabled: boolean
    rateLimitStrategy: $Enums.RateLimitStrategy
    rateLimitMax: number
    rateLimitWindow: number
    createdAt: Date
    updatedAt: Date
    _count: EndpointCountAggregateOutputType | null
    _avg: EndpointAvgAggregateOutputType | null
    _sum: EndpointSumAggregateOutputType | null
    _min: EndpointMinAggregateOutputType | null
    _max: EndpointMaxAggregateOutputType | null
  }

  type GetEndpointGroupByPayload<T extends EndpointGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EndpointGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EndpointGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EndpointGroupByOutputType[P]>
            : GetScalarType<T[P], EndpointGroupByOutputType[P]>
        }
      >
    >


  export type EndpointSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    path?: boolean
    method?: boolean
    responseSchema?: boolean
    statusCode?: boolean
    delayMs?: boolean
    rateLimitEnabled?: boolean
    rateLimitStrategy?: boolean
    rateLimitMax?: boolean
    rateLimitWindow?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    logs?: boolean | Endpoint$logsArgs<ExtArgs>
    _count?: boolean | EndpointCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["endpoint"]>

  export type EndpointSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    path?: boolean
    method?: boolean
    responseSchema?: boolean
    statusCode?: boolean
    delayMs?: boolean
    rateLimitEnabled?: boolean
    rateLimitStrategy?: boolean
    rateLimitMax?: boolean
    rateLimitWindow?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["endpoint"]>

  export type EndpointSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    path?: boolean
    method?: boolean
    responseSchema?: boolean
    statusCode?: boolean
    delayMs?: boolean
    rateLimitEnabled?: boolean
    rateLimitStrategy?: boolean
    rateLimitMax?: boolean
    rateLimitWindow?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["endpoint"]>

  export type EndpointSelectScalar = {
    id?: boolean
    projectId?: boolean
    path?: boolean
    method?: boolean
    responseSchema?: boolean
    statusCode?: boolean
    delayMs?: boolean
    rateLimitEnabled?: boolean
    rateLimitStrategy?: boolean
    rateLimitMax?: boolean
    rateLimitWindow?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type EndpointOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "projectId" | "path" | "method" | "responseSchema" | "statusCode" | "delayMs" | "rateLimitEnabled" | "rateLimitStrategy" | "rateLimitMax" | "rateLimitWindow" | "createdAt" | "updatedAt", ExtArgs["result"]["endpoint"]>
  export type EndpointInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    logs?: boolean | Endpoint$logsArgs<ExtArgs>
    _count?: boolean | EndpointCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type EndpointIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }
  export type EndpointIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }

  export type $EndpointPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Endpoint"
    objects: {
      project: Prisma.$ProjectPayload<ExtArgs>
      logs: Prisma.$UsageLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      projectId: string
      path: string
      method: $Enums.HttpMethod
      responseSchema: Prisma.JsonValue
      statusCode: number
      delayMs: number
      rateLimitEnabled: boolean
      rateLimitStrategy: $Enums.RateLimitStrategy
      rateLimitMax: number
      rateLimitWindow: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["endpoint"]>
    composites: {}
  }

  type EndpointGetPayload<S extends boolean | null | undefined | EndpointDefaultArgs> = $Result.GetResult<Prisma.$EndpointPayload, S>

  type EndpointCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EndpointFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EndpointCountAggregateInputType | true
    }

  export interface EndpointDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Endpoint'], meta: { name: 'Endpoint' } }
    /**
     * Find zero or one Endpoint that matches the filter.
     * @param {EndpointFindUniqueArgs} args - Arguments to find a Endpoint
     * @example
     * // Get one Endpoint
     * const endpoint = await prisma.endpoint.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EndpointFindUniqueArgs>(args: SelectSubset<T, EndpointFindUniqueArgs<ExtArgs>>): Prisma__EndpointClient<$Result.GetResult<Prisma.$EndpointPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Endpoint that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EndpointFindUniqueOrThrowArgs} args - Arguments to find a Endpoint
     * @example
     * // Get one Endpoint
     * const endpoint = await prisma.endpoint.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EndpointFindUniqueOrThrowArgs>(args: SelectSubset<T, EndpointFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EndpointClient<$Result.GetResult<Prisma.$EndpointPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Endpoint that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EndpointFindFirstArgs} args - Arguments to find a Endpoint
     * @example
     * // Get one Endpoint
     * const endpoint = await prisma.endpoint.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EndpointFindFirstArgs>(args?: SelectSubset<T, EndpointFindFirstArgs<ExtArgs>>): Prisma__EndpointClient<$Result.GetResult<Prisma.$EndpointPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Endpoint that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EndpointFindFirstOrThrowArgs} args - Arguments to find a Endpoint
     * @example
     * // Get one Endpoint
     * const endpoint = await prisma.endpoint.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EndpointFindFirstOrThrowArgs>(args?: SelectSubset<T, EndpointFindFirstOrThrowArgs<ExtArgs>>): Prisma__EndpointClient<$Result.GetResult<Prisma.$EndpointPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Endpoints that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EndpointFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Endpoints
     * const endpoints = await prisma.endpoint.findMany()
     * 
     * // Get first 10 Endpoints
     * const endpoints = await prisma.endpoint.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const endpointWithIdOnly = await prisma.endpoint.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EndpointFindManyArgs>(args?: SelectSubset<T, EndpointFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EndpointPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Endpoint.
     * @param {EndpointCreateArgs} args - Arguments to create a Endpoint.
     * @example
     * // Create one Endpoint
     * const Endpoint = await prisma.endpoint.create({
     *   data: {
     *     // ... data to create a Endpoint
     *   }
     * })
     * 
     */
    create<T extends EndpointCreateArgs>(args: SelectSubset<T, EndpointCreateArgs<ExtArgs>>): Prisma__EndpointClient<$Result.GetResult<Prisma.$EndpointPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Endpoints.
     * @param {EndpointCreateManyArgs} args - Arguments to create many Endpoints.
     * @example
     * // Create many Endpoints
     * const endpoint = await prisma.endpoint.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EndpointCreateManyArgs>(args?: SelectSubset<T, EndpointCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Endpoints and returns the data saved in the database.
     * @param {EndpointCreateManyAndReturnArgs} args - Arguments to create many Endpoints.
     * @example
     * // Create many Endpoints
     * const endpoint = await prisma.endpoint.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Endpoints and only return the `id`
     * const endpointWithIdOnly = await prisma.endpoint.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EndpointCreateManyAndReturnArgs>(args?: SelectSubset<T, EndpointCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EndpointPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Endpoint.
     * @param {EndpointDeleteArgs} args - Arguments to delete one Endpoint.
     * @example
     * // Delete one Endpoint
     * const Endpoint = await prisma.endpoint.delete({
     *   where: {
     *     // ... filter to delete one Endpoint
     *   }
     * })
     * 
     */
    delete<T extends EndpointDeleteArgs>(args: SelectSubset<T, EndpointDeleteArgs<ExtArgs>>): Prisma__EndpointClient<$Result.GetResult<Prisma.$EndpointPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Endpoint.
     * @param {EndpointUpdateArgs} args - Arguments to update one Endpoint.
     * @example
     * // Update one Endpoint
     * const endpoint = await prisma.endpoint.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EndpointUpdateArgs>(args: SelectSubset<T, EndpointUpdateArgs<ExtArgs>>): Prisma__EndpointClient<$Result.GetResult<Prisma.$EndpointPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Endpoints.
     * @param {EndpointDeleteManyArgs} args - Arguments to filter Endpoints to delete.
     * @example
     * // Delete a few Endpoints
     * const { count } = await prisma.endpoint.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EndpointDeleteManyArgs>(args?: SelectSubset<T, EndpointDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Endpoints.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EndpointUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Endpoints
     * const endpoint = await prisma.endpoint.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EndpointUpdateManyArgs>(args: SelectSubset<T, EndpointUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Endpoints and returns the data updated in the database.
     * @param {EndpointUpdateManyAndReturnArgs} args - Arguments to update many Endpoints.
     * @example
     * // Update many Endpoints
     * const endpoint = await prisma.endpoint.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Endpoints and only return the `id`
     * const endpointWithIdOnly = await prisma.endpoint.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EndpointUpdateManyAndReturnArgs>(args: SelectSubset<T, EndpointUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EndpointPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Endpoint.
     * @param {EndpointUpsertArgs} args - Arguments to update or create a Endpoint.
     * @example
     * // Update or create a Endpoint
     * const endpoint = await prisma.endpoint.upsert({
     *   create: {
     *     // ... data to create a Endpoint
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Endpoint we want to update
     *   }
     * })
     */
    upsert<T extends EndpointUpsertArgs>(args: SelectSubset<T, EndpointUpsertArgs<ExtArgs>>): Prisma__EndpointClient<$Result.GetResult<Prisma.$EndpointPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Endpoints.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EndpointCountArgs} args - Arguments to filter Endpoints to count.
     * @example
     * // Count the number of Endpoints
     * const count = await prisma.endpoint.count({
     *   where: {
     *     // ... the filter for the Endpoints we want to count
     *   }
     * })
    **/
    count<T extends EndpointCountArgs>(
      args?: Subset<T, EndpointCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EndpointCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Endpoint.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EndpointAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EndpointAggregateArgs>(args: Subset<T, EndpointAggregateArgs>): Prisma.PrismaPromise<GetEndpointAggregateType<T>>

    /**
     * Group by Endpoint.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EndpointGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EndpointGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EndpointGroupByArgs['orderBy'] }
        : { orderBy?: EndpointGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EndpointGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEndpointGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Endpoint model
   */
  readonly fields: EndpointFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Endpoint.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EndpointClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    project<T extends ProjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProjectDefaultArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    logs<T extends Endpoint$logsArgs<ExtArgs> = {}>(args?: Subset<T, Endpoint$logsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsageLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Endpoint model
   */
  interface EndpointFieldRefs {
    readonly id: FieldRef<"Endpoint", 'String'>
    readonly projectId: FieldRef<"Endpoint", 'String'>
    readonly path: FieldRef<"Endpoint", 'String'>
    readonly method: FieldRef<"Endpoint", 'HttpMethod'>
    readonly responseSchema: FieldRef<"Endpoint", 'Json'>
    readonly statusCode: FieldRef<"Endpoint", 'Int'>
    readonly delayMs: FieldRef<"Endpoint", 'Int'>
    readonly rateLimitEnabled: FieldRef<"Endpoint", 'Boolean'>
    readonly rateLimitStrategy: FieldRef<"Endpoint", 'RateLimitStrategy'>
    readonly rateLimitMax: FieldRef<"Endpoint", 'Int'>
    readonly rateLimitWindow: FieldRef<"Endpoint", 'Int'>
    readonly createdAt: FieldRef<"Endpoint", 'DateTime'>
    readonly updatedAt: FieldRef<"Endpoint", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Endpoint findUnique
   */
  export type EndpointFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Endpoint
     */
    select?: EndpointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Endpoint
     */
    omit?: EndpointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EndpointInclude<ExtArgs> | null
    /**
     * Filter, which Endpoint to fetch.
     */
    where: EndpointWhereUniqueInput
  }

  /**
   * Endpoint findUniqueOrThrow
   */
  export type EndpointFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Endpoint
     */
    select?: EndpointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Endpoint
     */
    omit?: EndpointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EndpointInclude<ExtArgs> | null
    /**
     * Filter, which Endpoint to fetch.
     */
    where: EndpointWhereUniqueInput
  }

  /**
   * Endpoint findFirst
   */
  export type EndpointFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Endpoint
     */
    select?: EndpointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Endpoint
     */
    omit?: EndpointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EndpointInclude<ExtArgs> | null
    /**
     * Filter, which Endpoint to fetch.
     */
    where?: EndpointWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Endpoints to fetch.
     */
    orderBy?: EndpointOrderByWithRelationInput | EndpointOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Endpoints.
     */
    cursor?: EndpointWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Endpoints from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Endpoints.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Endpoints.
     */
    distinct?: EndpointScalarFieldEnum | EndpointScalarFieldEnum[]
  }

  /**
   * Endpoint findFirstOrThrow
   */
  export type EndpointFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Endpoint
     */
    select?: EndpointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Endpoint
     */
    omit?: EndpointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EndpointInclude<ExtArgs> | null
    /**
     * Filter, which Endpoint to fetch.
     */
    where?: EndpointWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Endpoints to fetch.
     */
    orderBy?: EndpointOrderByWithRelationInput | EndpointOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Endpoints.
     */
    cursor?: EndpointWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Endpoints from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Endpoints.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Endpoints.
     */
    distinct?: EndpointScalarFieldEnum | EndpointScalarFieldEnum[]
  }

  /**
   * Endpoint findMany
   */
  export type EndpointFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Endpoint
     */
    select?: EndpointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Endpoint
     */
    omit?: EndpointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EndpointInclude<ExtArgs> | null
    /**
     * Filter, which Endpoints to fetch.
     */
    where?: EndpointWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Endpoints to fetch.
     */
    orderBy?: EndpointOrderByWithRelationInput | EndpointOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Endpoints.
     */
    cursor?: EndpointWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Endpoints from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Endpoints.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Endpoints.
     */
    distinct?: EndpointScalarFieldEnum | EndpointScalarFieldEnum[]
  }

  /**
   * Endpoint create
   */
  export type EndpointCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Endpoint
     */
    select?: EndpointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Endpoint
     */
    omit?: EndpointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EndpointInclude<ExtArgs> | null
    /**
     * The data needed to create a Endpoint.
     */
    data: XOR<EndpointCreateInput, EndpointUncheckedCreateInput>
  }

  /**
   * Endpoint createMany
   */
  export type EndpointCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Endpoints.
     */
    data: EndpointCreateManyInput | EndpointCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Endpoint createManyAndReturn
   */
  export type EndpointCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Endpoint
     */
    select?: EndpointSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Endpoint
     */
    omit?: EndpointOmit<ExtArgs> | null
    /**
     * The data used to create many Endpoints.
     */
    data: EndpointCreateManyInput | EndpointCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EndpointIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Endpoint update
   */
  export type EndpointUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Endpoint
     */
    select?: EndpointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Endpoint
     */
    omit?: EndpointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EndpointInclude<ExtArgs> | null
    /**
     * The data needed to update a Endpoint.
     */
    data: XOR<EndpointUpdateInput, EndpointUncheckedUpdateInput>
    /**
     * Choose, which Endpoint to update.
     */
    where: EndpointWhereUniqueInput
  }

  /**
   * Endpoint updateMany
   */
  export type EndpointUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Endpoints.
     */
    data: XOR<EndpointUpdateManyMutationInput, EndpointUncheckedUpdateManyInput>
    /**
     * Filter which Endpoints to update
     */
    where?: EndpointWhereInput
    /**
     * Limit how many Endpoints to update.
     */
    limit?: number
  }

  /**
   * Endpoint updateManyAndReturn
   */
  export type EndpointUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Endpoint
     */
    select?: EndpointSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Endpoint
     */
    omit?: EndpointOmit<ExtArgs> | null
    /**
     * The data used to update Endpoints.
     */
    data: XOR<EndpointUpdateManyMutationInput, EndpointUncheckedUpdateManyInput>
    /**
     * Filter which Endpoints to update
     */
    where?: EndpointWhereInput
    /**
     * Limit how many Endpoints to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EndpointIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Endpoint upsert
   */
  export type EndpointUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Endpoint
     */
    select?: EndpointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Endpoint
     */
    omit?: EndpointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EndpointInclude<ExtArgs> | null
    /**
     * The filter to search for the Endpoint to update in case it exists.
     */
    where: EndpointWhereUniqueInput
    /**
     * In case the Endpoint found by the `where` argument doesn't exist, create a new Endpoint with this data.
     */
    create: XOR<EndpointCreateInput, EndpointUncheckedCreateInput>
    /**
     * In case the Endpoint was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EndpointUpdateInput, EndpointUncheckedUpdateInput>
  }

  /**
   * Endpoint delete
   */
  export type EndpointDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Endpoint
     */
    select?: EndpointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Endpoint
     */
    omit?: EndpointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EndpointInclude<ExtArgs> | null
    /**
     * Filter which Endpoint to delete.
     */
    where: EndpointWhereUniqueInput
  }

  /**
   * Endpoint deleteMany
   */
  export type EndpointDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Endpoints to delete
     */
    where?: EndpointWhereInput
    /**
     * Limit how many Endpoints to delete.
     */
    limit?: number
  }

  /**
   * Endpoint.logs
   */
  export type Endpoint$logsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageLog
     */
    select?: UsageLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsageLog
     */
    omit?: UsageLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageLogInclude<ExtArgs> | null
    where?: UsageLogWhereInput
    orderBy?: UsageLogOrderByWithRelationInput | UsageLogOrderByWithRelationInput[]
    cursor?: UsageLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UsageLogScalarFieldEnum | UsageLogScalarFieldEnum[]
  }

  /**
   * Endpoint without action
   */
  export type EndpointDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Endpoint
     */
    select?: EndpointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Endpoint
     */
    omit?: EndpointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EndpointInclude<ExtArgs> | null
  }


  /**
   * Model UsageLog
   */

  export type AggregateUsageLog = {
    _count: UsageLogCountAggregateOutputType | null
    _avg: UsageLogAvgAggregateOutputType | null
    _sum: UsageLogSumAggregateOutputType | null
    _min: UsageLogMinAggregateOutputType | null
    _max: UsageLogMaxAggregateOutputType | null
  }

  export type UsageLogAvgAggregateOutputType = {
    statusCode: number | null
    responseTimeMs: number | null
  }

  export type UsageLogSumAggregateOutputType = {
    statusCode: number | null
    responseTimeMs: number | null
  }

  export type UsageLogMinAggregateOutputType = {
    id: string | null
    endpointId: string | null
    projectId: string | null
    ipAddress: string | null
    userAgent: string | null
    statusCode: number | null
    responseTimeMs: number | null
    rateLimitHit: boolean | null
    timestamp: Date | null
  }

  export type UsageLogMaxAggregateOutputType = {
    id: string | null
    endpointId: string | null
    projectId: string | null
    ipAddress: string | null
    userAgent: string | null
    statusCode: number | null
    responseTimeMs: number | null
    rateLimitHit: boolean | null
    timestamp: Date | null
  }

  export type UsageLogCountAggregateOutputType = {
    id: number
    endpointId: number
    projectId: number
    ipAddress: number
    userAgent: number
    statusCode: number
    responseTimeMs: number
    rateLimitHit: number
    timestamp: number
    _all: number
  }


  export type UsageLogAvgAggregateInputType = {
    statusCode?: true
    responseTimeMs?: true
  }

  export type UsageLogSumAggregateInputType = {
    statusCode?: true
    responseTimeMs?: true
  }

  export type UsageLogMinAggregateInputType = {
    id?: true
    endpointId?: true
    projectId?: true
    ipAddress?: true
    userAgent?: true
    statusCode?: true
    responseTimeMs?: true
    rateLimitHit?: true
    timestamp?: true
  }

  export type UsageLogMaxAggregateInputType = {
    id?: true
    endpointId?: true
    projectId?: true
    ipAddress?: true
    userAgent?: true
    statusCode?: true
    responseTimeMs?: true
    rateLimitHit?: true
    timestamp?: true
  }

  export type UsageLogCountAggregateInputType = {
    id?: true
    endpointId?: true
    projectId?: true
    ipAddress?: true
    userAgent?: true
    statusCode?: true
    responseTimeMs?: true
    rateLimitHit?: true
    timestamp?: true
    _all?: true
  }

  export type UsageLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UsageLog to aggregate.
     */
    where?: UsageLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UsageLogs to fetch.
     */
    orderBy?: UsageLogOrderByWithRelationInput | UsageLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UsageLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UsageLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UsageLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UsageLogs
    **/
    _count?: true | UsageLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UsageLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UsageLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UsageLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UsageLogMaxAggregateInputType
  }

  export type GetUsageLogAggregateType<T extends UsageLogAggregateArgs> = {
        [P in keyof T & keyof AggregateUsageLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsageLog[P]>
      : GetScalarType<T[P], AggregateUsageLog[P]>
  }




  export type UsageLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UsageLogWhereInput
    orderBy?: UsageLogOrderByWithAggregationInput | UsageLogOrderByWithAggregationInput[]
    by: UsageLogScalarFieldEnum[] | UsageLogScalarFieldEnum
    having?: UsageLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UsageLogCountAggregateInputType | true
    _avg?: UsageLogAvgAggregateInputType
    _sum?: UsageLogSumAggregateInputType
    _min?: UsageLogMinAggregateInputType
    _max?: UsageLogMaxAggregateInputType
  }

  export type UsageLogGroupByOutputType = {
    id: string
    endpointId: string
    projectId: string
    ipAddress: string | null
    userAgent: string | null
    statusCode: number
    responseTimeMs: number
    rateLimitHit: boolean
    timestamp: Date
    _count: UsageLogCountAggregateOutputType | null
    _avg: UsageLogAvgAggregateOutputType | null
    _sum: UsageLogSumAggregateOutputType | null
    _min: UsageLogMinAggregateOutputType | null
    _max: UsageLogMaxAggregateOutputType | null
  }

  type GetUsageLogGroupByPayload<T extends UsageLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UsageLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsageLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsageLogGroupByOutputType[P]>
            : GetScalarType<T[P], UsageLogGroupByOutputType[P]>
        }
      >
    >


  export type UsageLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    endpointId?: boolean
    projectId?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    statusCode?: boolean
    responseTimeMs?: boolean
    rateLimitHit?: boolean
    timestamp?: boolean
    endpoint?: boolean | EndpointDefaultArgs<ExtArgs>
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["usageLog"]>

  export type UsageLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    endpointId?: boolean
    projectId?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    statusCode?: boolean
    responseTimeMs?: boolean
    rateLimitHit?: boolean
    timestamp?: boolean
    endpoint?: boolean | EndpointDefaultArgs<ExtArgs>
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["usageLog"]>

  export type UsageLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    endpointId?: boolean
    projectId?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    statusCode?: boolean
    responseTimeMs?: boolean
    rateLimitHit?: boolean
    timestamp?: boolean
    endpoint?: boolean | EndpointDefaultArgs<ExtArgs>
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["usageLog"]>

  export type UsageLogSelectScalar = {
    id?: boolean
    endpointId?: boolean
    projectId?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    statusCode?: boolean
    responseTimeMs?: boolean
    rateLimitHit?: boolean
    timestamp?: boolean
  }

  export type UsageLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "endpointId" | "projectId" | "ipAddress" | "userAgent" | "statusCode" | "responseTimeMs" | "rateLimitHit" | "timestamp", ExtArgs["result"]["usageLog"]>
  export type UsageLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    endpoint?: boolean | EndpointDefaultArgs<ExtArgs>
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }
  export type UsageLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    endpoint?: boolean | EndpointDefaultArgs<ExtArgs>
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }
  export type UsageLogIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    endpoint?: boolean | EndpointDefaultArgs<ExtArgs>
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }

  export type $UsageLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UsageLog"
    objects: {
      endpoint: Prisma.$EndpointPayload<ExtArgs>
      project: Prisma.$ProjectPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      endpointId: string
      projectId: string
      ipAddress: string | null
      userAgent: string | null
      statusCode: number
      responseTimeMs: number
      rateLimitHit: boolean
      timestamp: Date
    }, ExtArgs["result"]["usageLog"]>
    composites: {}
  }

  type UsageLogGetPayload<S extends boolean | null | undefined | UsageLogDefaultArgs> = $Result.GetResult<Prisma.$UsageLogPayload, S>

  type UsageLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UsageLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UsageLogCountAggregateInputType | true
    }

  export interface UsageLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UsageLog'], meta: { name: 'UsageLog' } }
    /**
     * Find zero or one UsageLog that matches the filter.
     * @param {UsageLogFindUniqueArgs} args - Arguments to find a UsageLog
     * @example
     * // Get one UsageLog
     * const usageLog = await prisma.usageLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UsageLogFindUniqueArgs>(args: SelectSubset<T, UsageLogFindUniqueArgs<ExtArgs>>): Prisma__UsageLogClient<$Result.GetResult<Prisma.$UsageLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UsageLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UsageLogFindUniqueOrThrowArgs} args - Arguments to find a UsageLog
     * @example
     * // Get one UsageLog
     * const usageLog = await prisma.usageLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UsageLogFindUniqueOrThrowArgs>(args: SelectSubset<T, UsageLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UsageLogClient<$Result.GetResult<Prisma.$UsageLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UsageLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsageLogFindFirstArgs} args - Arguments to find a UsageLog
     * @example
     * // Get one UsageLog
     * const usageLog = await prisma.usageLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UsageLogFindFirstArgs>(args?: SelectSubset<T, UsageLogFindFirstArgs<ExtArgs>>): Prisma__UsageLogClient<$Result.GetResult<Prisma.$UsageLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UsageLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsageLogFindFirstOrThrowArgs} args - Arguments to find a UsageLog
     * @example
     * // Get one UsageLog
     * const usageLog = await prisma.usageLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UsageLogFindFirstOrThrowArgs>(args?: SelectSubset<T, UsageLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__UsageLogClient<$Result.GetResult<Prisma.$UsageLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UsageLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsageLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UsageLogs
     * const usageLogs = await prisma.usageLog.findMany()
     * 
     * // Get first 10 UsageLogs
     * const usageLogs = await prisma.usageLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const usageLogWithIdOnly = await prisma.usageLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UsageLogFindManyArgs>(args?: SelectSubset<T, UsageLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsageLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UsageLog.
     * @param {UsageLogCreateArgs} args - Arguments to create a UsageLog.
     * @example
     * // Create one UsageLog
     * const UsageLog = await prisma.usageLog.create({
     *   data: {
     *     // ... data to create a UsageLog
     *   }
     * })
     * 
     */
    create<T extends UsageLogCreateArgs>(args: SelectSubset<T, UsageLogCreateArgs<ExtArgs>>): Prisma__UsageLogClient<$Result.GetResult<Prisma.$UsageLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UsageLogs.
     * @param {UsageLogCreateManyArgs} args - Arguments to create many UsageLogs.
     * @example
     * // Create many UsageLogs
     * const usageLog = await prisma.usageLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UsageLogCreateManyArgs>(args?: SelectSubset<T, UsageLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UsageLogs and returns the data saved in the database.
     * @param {UsageLogCreateManyAndReturnArgs} args - Arguments to create many UsageLogs.
     * @example
     * // Create many UsageLogs
     * const usageLog = await prisma.usageLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UsageLogs and only return the `id`
     * const usageLogWithIdOnly = await prisma.usageLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UsageLogCreateManyAndReturnArgs>(args?: SelectSubset<T, UsageLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsageLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UsageLog.
     * @param {UsageLogDeleteArgs} args - Arguments to delete one UsageLog.
     * @example
     * // Delete one UsageLog
     * const UsageLog = await prisma.usageLog.delete({
     *   where: {
     *     // ... filter to delete one UsageLog
     *   }
     * })
     * 
     */
    delete<T extends UsageLogDeleteArgs>(args: SelectSubset<T, UsageLogDeleteArgs<ExtArgs>>): Prisma__UsageLogClient<$Result.GetResult<Prisma.$UsageLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UsageLog.
     * @param {UsageLogUpdateArgs} args - Arguments to update one UsageLog.
     * @example
     * // Update one UsageLog
     * const usageLog = await prisma.usageLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UsageLogUpdateArgs>(args: SelectSubset<T, UsageLogUpdateArgs<ExtArgs>>): Prisma__UsageLogClient<$Result.GetResult<Prisma.$UsageLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UsageLogs.
     * @param {UsageLogDeleteManyArgs} args - Arguments to filter UsageLogs to delete.
     * @example
     * // Delete a few UsageLogs
     * const { count } = await prisma.usageLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UsageLogDeleteManyArgs>(args?: SelectSubset<T, UsageLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UsageLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsageLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UsageLogs
     * const usageLog = await prisma.usageLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UsageLogUpdateManyArgs>(args: SelectSubset<T, UsageLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UsageLogs and returns the data updated in the database.
     * @param {UsageLogUpdateManyAndReturnArgs} args - Arguments to update many UsageLogs.
     * @example
     * // Update many UsageLogs
     * const usageLog = await prisma.usageLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UsageLogs and only return the `id`
     * const usageLogWithIdOnly = await prisma.usageLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UsageLogUpdateManyAndReturnArgs>(args: SelectSubset<T, UsageLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsageLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UsageLog.
     * @param {UsageLogUpsertArgs} args - Arguments to update or create a UsageLog.
     * @example
     * // Update or create a UsageLog
     * const usageLog = await prisma.usageLog.upsert({
     *   create: {
     *     // ... data to create a UsageLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UsageLog we want to update
     *   }
     * })
     */
    upsert<T extends UsageLogUpsertArgs>(args: SelectSubset<T, UsageLogUpsertArgs<ExtArgs>>): Prisma__UsageLogClient<$Result.GetResult<Prisma.$UsageLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UsageLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsageLogCountArgs} args - Arguments to filter UsageLogs to count.
     * @example
     * // Count the number of UsageLogs
     * const count = await prisma.usageLog.count({
     *   where: {
     *     // ... the filter for the UsageLogs we want to count
     *   }
     * })
    **/
    count<T extends UsageLogCountArgs>(
      args?: Subset<T, UsageLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsageLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UsageLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsageLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UsageLogAggregateArgs>(args: Subset<T, UsageLogAggregateArgs>): Prisma.PrismaPromise<GetUsageLogAggregateType<T>>

    /**
     * Group by UsageLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsageLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UsageLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UsageLogGroupByArgs['orderBy'] }
        : { orderBy?: UsageLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UsageLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsageLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UsageLog model
   */
  readonly fields: UsageLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UsageLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UsageLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    endpoint<T extends EndpointDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EndpointDefaultArgs<ExtArgs>>): Prisma__EndpointClient<$Result.GetResult<Prisma.$EndpointPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    project<T extends ProjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProjectDefaultArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UsageLog model
   */
  interface UsageLogFieldRefs {
    readonly id: FieldRef<"UsageLog", 'String'>
    readonly endpointId: FieldRef<"UsageLog", 'String'>
    readonly projectId: FieldRef<"UsageLog", 'String'>
    readonly ipAddress: FieldRef<"UsageLog", 'String'>
    readonly userAgent: FieldRef<"UsageLog", 'String'>
    readonly statusCode: FieldRef<"UsageLog", 'Int'>
    readonly responseTimeMs: FieldRef<"UsageLog", 'Int'>
    readonly rateLimitHit: FieldRef<"UsageLog", 'Boolean'>
    readonly timestamp: FieldRef<"UsageLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UsageLog findUnique
   */
  export type UsageLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageLog
     */
    select?: UsageLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsageLog
     */
    omit?: UsageLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageLogInclude<ExtArgs> | null
    /**
     * Filter, which UsageLog to fetch.
     */
    where: UsageLogWhereUniqueInput
  }

  /**
   * UsageLog findUniqueOrThrow
   */
  export type UsageLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageLog
     */
    select?: UsageLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsageLog
     */
    omit?: UsageLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageLogInclude<ExtArgs> | null
    /**
     * Filter, which UsageLog to fetch.
     */
    where: UsageLogWhereUniqueInput
  }

  /**
   * UsageLog findFirst
   */
  export type UsageLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageLog
     */
    select?: UsageLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsageLog
     */
    omit?: UsageLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageLogInclude<ExtArgs> | null
    /**
     * Filter, which UsageLog to fetch.
     */
    where?: UsageLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UsageLogs to fetch.
     */
    orderBy?: UsageLogOrderByWithRelationInput | UsageLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UsageLogs.
     */
    cursor?: UsageLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UsageLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UsageLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UsageLogs.
     */
    distinct?: UsageLogScalarFieldEnum | UsageLogScalarFieldEnum[]
  }

  /**
   * UsageLog findFirstOrThrow
   */
  export type UsageLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageLog
     */
    select?: UsageLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsageLog
     */
    omit?: UsageLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageLogInclude<ExtArgs> | null
    /**
     * Filter, which UsageLog to fetch.
     */
    where?: UsageLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UsageLogs to fetch.
     */
    orderBy?: UsageLogOrderByWithRelationInput | UsageLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UsageLogs.
     */
    cursor?: UsageLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UsageLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UsageLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UsageLogs.
     */
    distinct?: UsageLogScalarFieldEnum | UsageLogScalarFieldEnum[]
  }

  /**
   * UsageLog findMany
   */
  export type UsageLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageLog
     */
    select?: UsageLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsageLog
     */
    omit?: UsageLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageLogInclude<ExtArgs> | null
    /**
     * Filter, which UsageLogs to fetch.
     */
    where?: UsageLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UsageLogs to fetch.
     */
    orderBy?: UsageLogOrderByWithRelationInput | UsageLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UsageLogs.
     */
    cursor?: UsageLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UsageLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UsageLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UsageLogs.
     */
    distinct?: UsageLogScalarFieldEnum | UsageLogScalarFieldEnum[]
  }

  /**
   * UsageLog create
   */
  export type UsageLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageLog
     */
    select?: UsageLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsageLog
     */
    omit?: UsageLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageLogInclude<ExtArgs> | null
    /**
     * The data needed to create a UsageLog.
     */
    data: XOR<UsageLogCreateInput, UsageLogUncheckedCreateInput>
  }

  /**
   * UsageLog createMany
   */
  export type UsageLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UsageLogs.
     */
    data: UsageLogCreateManyInput | UsageLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UsageLog createManyAndReturn
   */
  export type UsageLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageLog
     */
    select?: UsageLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UsageLog
     */
    omit?: UsageLogOmit<ExtArgs> | null
    /**
     * The data used to create many UsageLogs.
     */
    data: UsageLogCreateManyInput | UsageLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UsageLog update
   */
  export type UsageLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageLog
     */
    select?: UsageLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsageLog
     */
    omit?: UsageLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageLogInclude<ExtArgs> | null
    /**
     * The data needed to update a UsageLog.
     */
    data: XOR<UsageLogUpdateInput, UsageLogUncheckedUpdateInput>
    /**
     * Choose, which UsageLog to update.
     */
    where: UsageLogWhereUniqueInput
  }

  /**
   * UsageLog updateMany
   */
  export type UsageLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UsageLogs.
     */
    data: XOR<UsageLogUpdateManyMutationInput, UsageLogUncheckedUpdateManyInput>
    /**
     * Filter which UsageLogs to update
     */
    where?: UsageLogWhereInput
    /**
     * Limit how many UsageLogs to update.
     */
    limit?: number
  }

  /**
   * UsageLog updateManyAndReturn
   */
  export type UsageLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageLog
     */
    select?: UsageLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UsageLog
     */
    omit?: UsageLogOmit<ExtArgs> | null
    /**
     * The data used to update UsageLogs.
     */
    data: XOR<UsageLogUpdateManyMutationInput, UsageLogUncheckedUpdateManyInput>
    /**
     * Filter which UsageLogs to update
     */
    where?: UsageLogWhereInput
    /**
     * Limit how many UsageLogs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageLogIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UsageLog upsert
   */
  export type UsageLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageLog
     */
    select?: UsageLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsageLog
     */
    omit?: UsageLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageLogInclude<ExtArgs> | null
    /**
     * The filter to search for the UsageLog to update in case it exists.
     */
    where: UsageLogWhereUniqueInput
    /**
     * In case the UsageLog found by the `where` argument doesn't exist, create a new UsageLog with this data.
     */
    create: XOR<UsageLogCreateInput, UsageLogUncheckedCreateInput>
    /**
     * In case the UsageLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UsageLogUpdateInput, UsageLogUncheckedUpdateInput>
  }

  /**
   * UsageLog delete
   */
  export type UsageLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageLog
     */
    select?: UsageLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsageLog
     */
    omit?: UsageLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageLogInclude<ExtArgs> | null
    /**
     * Filter which UsageLog to delete.
     */
    where: UsageLogWhereUniqueInput
  }

  /**
   * UsageLog deleteMany
   */
  export type UsageLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UsageLogs to delete
     */
    where?: UsageLogWhereInput
    /**
     * Limit how many UsageLogs to delete.
     */
    limit?: number
  }

  /**
   * UsageLog without action
   */
  export type UsageLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageLog
     */
    select?: UsageLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsageLog
     */
    omit?: UsageLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageLogInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    password: 'password',
    name: 'name',
    emailVerified: 'emailVerified',
    tokenVersion: 'tokenVersion',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const OtpCodeScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    code: 'code',
    type: 'type',
    expiresAt: 'expiresAt',
    usedAt: 'usedAt',
    createdAt: 'createdAt'
  };

  export type OtpCodeScalarFieldEnum = (typeof OtpCodeScalarFieldEnum)[keyof typeof OtpCodeScalarFieldEnum]


  export const ProjectScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    name: 'name',
    description: 'description',
    status: 'status',
    defaultRateLimitMax: 'defaultRateLimitMax',
    defaultRateLimitWindow: 'defaultRateLimitWindow',
    defaultRateLimitStrategy: 'defaultRateLimitStrategy',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProjectScalarFieldEnum = (typeof ProjectScalarFieldEnum)[keyof typeof ProjectScalarFieldEnum]


  export const ApiKeyScalarFieldEnum: {
    id: 'id',
    projectId: 'projectId',
    name: 'name',
    keyHash: 'keyHash',
    keyPrefix: 'keyPrefix',
    lastUsedAt: 'lastUsedAt',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ApiKeyScalarFieldEnum = (typeof ApiKeyScalarFieldEnum)[keyof typeof ApiKeyScalarFieldEnum]


  export const EndpointScalarFieldEnum: {
    id: 'id',
    projectId: 'projectId',
    path: 'path',
    method: 'method',
    responseSchema: 'responseSchema',
    statusCode: 'statusCode',
    delayMs: 'delayMs',
    rateLimitEnabled: 'rateLimitEnabled',
    rateLimitStrategy: 'rateLimitStrategy',
    rateLimitMax: 'rateLimitMax',
    rateLimitWindow: 'rateLimitWindow',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type EndpointScalarFieldEnum = (typeof EndpointScalarFieldEnum)[keyof typeof EndpointScalarFieldEnum]


  export const UsageLogScalarFieldEnum: {
    id: 'id',
    endpointId: 'endpointId',
    projectId: 'projectId',
    ipAddress: 'ipAddress',
    userAgent: 'userAgent',
    statusCode: 'statusCode',
    responseTimeMs: 'responseTimeMs',
    rateLimitHit: 'rateLimitHit',
    timestamp: 'timestamp'
  };

  export type UsageLogScalarFieldEnum = (typeof UsageLogScalarFieldEnum)[keyof typeof UsageLogScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'OtpType'
   */
  export type EnumOtpTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OtpType'>
    


  /**
   * Reference to a field of type 'OtpType[]'
   */
  export type ListEnumOtpTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OtpType[]'>
    


  /**
   * Reference to a field of type 'ProjectStatus'
   */
  export type EnumProjectStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProjectStatus'>
    


  /**
   * Reference to a field of type 'ProjectStatus[]'
   */
  export type ListEnumProjectStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProjectStatus[]'>
    


  /**
   * Reference to a field of type 'RateLimitStrategy'
   */
  export type EnumRateLimitStrategyFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RateLimitStrategy'>
    


  /**
   * Reference to a field of type 'RateLimitStrategy[]'
   */
  export type ListEnumRateLimitStrategyFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RateLimitStrategy[]'>
    


  /**
   * Reference to a field of type 'HttpMethod'
   */
  export type EnumHttpMethodFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'HttpMethod'>
    


  /**
   * Reference to a field of type 'HttpMethod[]'
   */
  export type ListEnumHttpMethodFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'HttpMethod[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    emailVerified?: BoolFilter<"User"> | boolean
    tokenVersion?: IntFilter<"User"> | number
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    projects?: ProjectListRelationFilter
    otpCodes?: OtpCodeListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrderInput | SortOrder
    emailVerified?: SortOrder
    tokenVersion?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    projects?: ProjectOrderByRelationAggregateInput
    otpCodes?: OtpCodeOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    emailVerified?: BoolFilter<"User"> | boolean
    tokenVersion?: IntFilter<"User"> | number
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    projects?: ProjectListRelationFilter
    otpCodes?: OtpCodeListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrderInput | SortOrder
    emailVerified?: SortOrder
    tokenVersion?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    emailVerified?: BoolWithAggregatesFilter<"User"> | boolean
    tokenVersion?: IntWithAggregatesFilter<"User"> | number
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type OtpCodeWhereInput = {
    AND?: OtpCodeWhereInput | OtpCodeWhereInput[]
    OR?: OtpCodeWhereInput[]
    NOT?: OtpCodeWhereInput | OtpCodeWhereInput[]
    id?: StringFilter<"OtpCode"> | string
    userId?: StringFilter<"OtpCode"> | string
    code?: StringFilter<"OtpCode"> | string
    type?: EnumOtpTypeFilter<"OtpCode"> | $Enums.OtpType
    expiresAt?: DateTimeFilter<"OtpCode"> | Date | string
    usedAt?: DateTimeNullableFilter<"OtpCode"> | Date | string | null
    createdAt?: DateTimeFilter<"OtpCode"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type OtpCodeOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    code?: SortOrder
    type?: SortOrder
    expiresAt?: SortOrder
    usedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type OtpCodeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: OtpCodeWhereInput | OtpCodeWhereInput[]
    OR?: OtpCodeWhereInput[]
    NOT?: OtpCodeWhereInput | OtpCodeWhereInput[]
    userId?: StringFilter<"OtpCode"> | string
    code?: StringFilter<"OtpCode"> | string
    type?: EnumOtpTypeFilter<"OtpCode"> | $Enums.OtpType
    expiresAt?: DateTimeFilter<"OtpCode"> | Date | string
    usedAt?: DateTimeNullableFilter<"OtpCode"> | Date | string | null
    createdAt?: DateTimeFilter<"OtpCode"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type OtpCodeOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    code?: SortOrder
    type?: SortOrder
    expiresAt?: SortOrder
    usedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: OtpCodeCountOrderByAggregateInput
    _max?: OtpCodeMaxOrderByAggregateInput
    _min?: OtpCodeMinOrderByAggregateInput
  }

  export type OtpCodeScalarWhereWithAggregatesInput = {
    AND?: OtpCodeScalarWhereWithAggregatesInput | OtpCodeScalarWhereWithAggregatesInput[]
    OR?: OtpCodeScalarWhereWithAggregatesInput[]
    NOT?: OtpCodeScalarWhereWithAggregatesInput | OtpCodeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"OtpCode"> | string
    userId?: StringWithAggregatesFilter<"OtpCode"> | string
    code?: StringWithAggregatesFilter<"OtpCode"> | string
    type?: EnumOtpTypeWithAggregatesFilter<"OtpCode"> | $Enums.OtpType
    expiresAt?: DateTimeWithAggregatesFilter<"OtpCode"> | Date | string
    usedAt?: DateTimeNullableWithAggregatesFilter<"OtpCode"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"OtpCode"> | Date | string
  }

  export type ProjectWhereInput = {
    AND?: ProjectWhereInput | ProjectWhereInput[]
    OR?: ProjectWhereInput[]
    NOT?: ProjectWhereInput | ProjectWhereInput[]
    id?: StringFilter<"Project"> | string
    userId?: StringFilter<"Project"> | string
    name?: StringFilter<"Project"> | string
    description?: StringNullableFilter<"Project"> | string | null
    status?: EnumProjectStatusFilter<"Project"> | $Enums.ProjectStatus
    defaultRateLimitMax?: IntFilter<"Project"> | number
    defaultRateLimitWindow?: IntFilter<"Project"> | number
    defaultRateLimitStrategy?: EnumRateLimitStrategyFilter<"Project"> | $Enums.RateLimitStrategy
    createdAt?: DateTimeFilter<"Project"> | Date | string
    updatedAt?: DateTimeFilter<"Project"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    apiKeys?: ApiKeyListRelationFilter
    endpoints?: EndpointListRelationFilter
    logs?: UsageLogListRelationFilter
  }

  export type ProjectOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    status?: SortOrder
    defaultRateLimitMax?: SortOrder
    defaultRateLimitWindow?: SortOrder
    defaultRateLimitStrategy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    apiKeys?: ApiKeyOrderByRelationAggregateInput
    endpoints?: EndpointOrderByRelationAggregateInput
    logs?: UsageLogOrderByRelationAggregateInput
  }

  export type ProjectWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_name?: ProjectUserIdNameCompoundUniqueInput
    AND?: ProjectWhereInput | ProjectWhereInput[]
    OR?: ProjectWhereInput[]
    NOT?: ProjectWhereInput | ProjectWhereInput[]
    userId?: StringFilter<"Project"> | string
    name?: StringFilter<"Project"> | string
    description?: StringNullableFilter<"Project"> | string | null
    status?: EnumProjectStatusFilter<"Project"> | $Enums.ProjectStatus
    defaultRateLimitMax?: IntFilter<"Project"> | number
    defaultRateLimitWindow?: IntFilter<"Project"> | number
    defaultRateLimitStrategy?: EnumRateLimitStrategyFilter<"Project"> | $Enums.RateLimitStrategy
    createdAt?: DateTimeFilter<"Project"> | Date | string
    updatedAt?: DateTimeFilter<"Project"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    apiKeys?: ApiKeyListRelationFilter
    endpoints?: EndpointListRelationFilter
    logs?: UsageLogListRelationFilter
  }, "id" | "userId_name">

  export type ProjectOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    status?: SortOrder
    defaultRateLimitMax?: SortOrder
    defaultRateLimitWindow?: SortOrder
    defaultRateLimitStrategy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProjectCountOrderByAggregateInput
    _avg?: ProjectAvgOrderByAggregateInput
    _max?: ProjectMaxOrderByAggregateInput
    _min?: ProjectMinOrderByAggregateInput
    _sum?: ProjectSumOrderByAggregateInput
  }

  export type ProjectScalarWhereWithAggregatesInput = {
    AND?: ProjectScalarWhereWithAggregatesInput | ProjectScalarWhereWithAggregatesInput[]
    OR?: ProjectScalarWhereWithAggregatesInput[]
    NOT?: ProjectScalarWhereWithAggregatesInput | ProjectScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Project"> | string
    userId?: StringWithAggregatesFilter<"Project"> | string
    name?: StringWithAggregatesFilter<"Project"> | string
    description?: StringNullableWithAggregatesFilter<"Project"> | string | null
    status?: EnumProjectStatusWithAggregatesFilter<"Project"> | $Enums.ProjectStatus
    defaultRateLimitMax?: IntWithAggregatesFilter<"Project"> | number
    defaultRateLimitWindow?: IntWithAggregatesFilter<"Project"> | number
    defaultRateLimitStrategy?: EnumRateLimitStrategyWithAggregatesFilter<"Project"> | $Enums.RateLimitStrategy
    createdAt?: DateTimeWithAggregatesFilter<"Project"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Project"> | Date | string
  }

  export type ApiKeyWhereInput = {
    AND?: ApiKeyWhereInput | ApiKeyWhereInput[]
    OR?: ApiKeyWhereInput[]
    NOT?: ApiKeyWhereInput | ApiKeyWhereInput[]
    id?: StringFilter<"ApiKey"> | string
    projectId?: StringFilter<"ApiKey"> | string
    name?: StringFilter<"ApiKey"> | string
    keyHash?: StringFilter<"ApiKey"> | string
    keyPrefix?: StringFilter<"ApiKey"> | string
    lastUsedAt?: DateTimeNullableFilter<"ApiKey"> | Date | string | null
    isActive?: BoolFilter<"ApiKey"> | boolean
    createdAt?: DateTimeFilter<"ApiKey"> | Date | string
    updatedAt?: DateTimeFilter<"ApiKey"> | Date | string
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
  }

  export type ApiKeyOrderByWithRelationInput = {
    id?: SortOrder
    projectId?: SortOrder
    name?: SortOrder
    keyHash?: SortOrder
    keyPrefix?: SortOrder
    lastUsedAt?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    project?: ProjectOrderByWithRelationInput
  }

  export type ApiKeyWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ApiKeyWhereInput | ApiKeyWhereInput[]
    OR?: ApiKeyWhereInput[]
    NOT?: ApiKeyWhereInput | ApiKeyWhereInput[]
    projectId?: StringFilter<"ApiKey"> | string
    name?: StringFilter<"ApiKey"> | string
    keyHash?: StringFilter<"ApiKey"> | string
    keyPrefix?: StringFilter<"ApiKey"> | string
    lastUsedAt?: DateTimeNullableFilter<"ApiKey"> | Date | string | null
    isActive?: BoolFilter<"ApiKey"> | boolean
    createdAt?: DateTimeFilter<"ApiKey"> | Date | string
    updatedAt?: DateTimeFilter<"ApiKey"> | Date | string
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
  }, "id">

  export type ApiKeyOrderByWithAggregationInput = {
    id?: SortOrder
    projectId?: SortOrder
    name?: SortOrder
    keyHash?: SortOrder
    keyPrefix?: SortOrder
    lastUsedAt?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ApiKeyCountOrderByAggregateInput
    _max?: ApiKeyMaxOrderByAggregateInput
    _min?: ApiKeyMinOrderByAggregateInput
  }

  export type ApiKeyScalarWhereWithAggregatesInput = {
    AND?: ApiKeyScalarWhereWithAggregatesInput | ApiKeyScalarWhereWithAggregatesInput[]
    OR?: ApiKeyScalarWhereWithAggregatesInput[]
    NOT?: ApiKeyScalarWhereWithAggregatesInput | ApiKeyScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ApiKey"> | string
    projectId?: StringWithAggregatesFilter<"ApiKey"> | string
    name?: StringWithAggregatesFilter<"ApiKey"> | string
    keyHash?: StringWithAggregatesFilter<"ApiKey"> | string
    keyPrefix?: StringWithAggregatesFilter<"ApiKey"> | string
    lastUsedAt?: DateTimeNullableWithAggregatesFilter<"ApiKey"> | Date | string | null
    isActive?: BoolWithAggregatesFilter<"ApiKey"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"ApiKey"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ApiKey"> | Date | string
  }

  export type EndpointWhereInput = {
    AND?: EndpointWhereInput | EndpointWhereInput[]
    OR?: EndpointWhereInput[]
    NOT?: EndpointWhereInput | EndpointWhereInput[]
    id?: StringFilter<"Endpoint"> | string
    projectId?: StringFilter<"Endpoint"> | string
    path?: StringFilter<"Endpoint"> | string
    method?: EnumHttpMethodFilter<"Endpoint"> | $Enums.HttpMethod
    responseSchema?: JsonFilter<"Endpoint">
    statusCode?: IntFilter<"Endpoint"> | number
    delayMs?: IntFilter<"Endpoint"> | number
    rateLimitEnabled?: BoolFilter<"Endpoint"> | boolean
    rateLimitStrategy?: EnumRateLimitStrategyFilter<"Endpoint"> | $Enums.RateLimitStrategy
    rateLimitMax?: IntFilter<"Endpoint"> | number
    rateLimitWindow?: IntFilter<"Endpoint"> | number
    createdAt?: DateTimeFilter<"Endpoint"> | Date | string
    updatedAt?: DateTimeFilter<"Endpoint"> | Date | string
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
    logs?: UsageLogListRelationFilter
  }

  export type EndpointOrderByWithRelationInput = {
    id?: SortOrder
    projectId?: SortOrder
    path?: SortOrder
    method?: SortOrder
    responseSchema?: SortOrder
    statusCode?: SortOrder
    delayMs?: SortOrder
    rateLimitEnabled?: SortOrder
    rateLimitStrategy?: SortOrder
    rateLimitMax?: SortOrder
    rateLimitWindow?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    project?: ProjectOrderByWithRelationInput
    logs?: UsageLogOrderByRelationAggregateInput
  }

  export type EndpointWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    projectId_method_path?: EndpointProjectIdMethodPathCompoundUniqueInput
    AND?: EndpointWhereInput | EndpointWhereInput[]
    OR?: EndpointWhereInput[]
    NOT?: EndpointWhereInput | EndpointWhereInput[]
    projectId?: StringFilter<"Endpoint"> | string
    path?: StringFilter<"Endpoint"> | string
    method?: EnumHttpMethodFilter<"Endpoint"> | $Enums.HttpMethod
    responseSchema?: JsonFilter<"Endpoint">
    statusCode?: IntFilter<"Endpoint"> | number
    delayMs?: IntFilter<"Endpoint"> | number
    rateLimitEnabled?: BoolFilter<"Endpoint"> | boolean
    rateLimitStrategy?: EnumRateLimitStrategyFilter<"Endpoint"> | $Enums.RateLimitStrategy
    rateLimitMax?: IntFilter<"Endpoint"> | number
    rateLimitWindow?: IntFilter<"Endpoint"> | number
    createdAt?: DateTimeFilter<"Endpoint"> | Date | string
    updatedAt?: DateTimeFilter<"Endpoint"> | Date | string
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
    logs?: UsageLogListRelationFilter
  }, "id" | "projectId_method_path">

  export type EndpointOrderByWithAggregationInput = {
    id?: SortOrder
    projectId?: SortOrder
    path?: SortOrder
    method?: SortOrder
    responseSchema?: SortOrder
    statusCode?: SortOrder
    delayMs?: SortOrder
    rateLimitEnabled?: SortOrder
    rateLimitStrategy?: SortOrder
    rateLimitMax?: SortOrder
    rateLimitWindow?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: EndpointCountOrderByAggregateInput
    _avg?: EndpointAvgOrderByAggregateInput
    _max?: EndpointMaxOrderByAggregateInput
    _min?: EndpointMinOrderByAggregateInput
    _sum?: EndpointSumOrderByAggregateInput
  }

  export type EndpointScalarWhereWithAggregatesInput = {
    AND?: EndpointScalarWhereWithAggregatesInput | EndpointScalarWhereWithAggregatesInput[]
    OR?: EndpointScalarWhereWithAggregatesInput[]
    NOT?: EndpointScalarWhereWithAggregatesInput | EndpointScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Endpoint"> | string
    projectId?: StringWithAggregatesFilter<"Endpoint"> | string
    path?: StringWithAggregatesFilter<"Endpoint"> | string
    method?: EnumHttpMethodWithAggregatesFilter<"Endpoint"> | $Enums.HttpMethod
    responseSchema?: JsonWithAggregatesFilter<"Endpoint">
    statusCode?: IntWithAggregatesFilter<"Endpoint"> | number
    delayMs?: IntWithAggregatesFilter<"Endpoint"> | number
    rateLimitEnabled?: BoolWithAggregatesFilter<"Endpoint"> | boolean
    rateLimitStrategy?: EnumRateLimitStrategyWithAggregatesFilter<"Endpoint"> | $Enums.RateLimitStrategy
    rateLimitMax?: IntWithAggregatesFilter<"Endpoint"> | number
    rateLimitWindow?: IntWithAggregatesFilter<"Endpoint"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Endpoint"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Endpoint"> | Date | string
  }

  export type UsageLogWhereInput = {
    AND?: UsageLogWhereInput | UsageLogWhereInput[]
    OR?: UsageLogWhereInput[]
    NOT?: UsageLogWhereInput | UsageLogWhereInput[]
    id?: StringFilter<"UsageLog"> | string
    endpointId?: StringFilter<"UsageLog"> | string
    projectId?: StringFilter<"UsageLog"> | string
    ipAddress?: StringNullableFilter<"UsageLog"> | string | null
    userAgent?: StringNullableFilter<"UsageLog"> | string | null
    statusCode?: IntFilter<"UsageLog"> | number
    responseTimeMs?: IntFilter<"UsageLog"> | number
    rateLimitHit?: BoolFilter<"UsageLog"> | boolean
    timestamp?: DateTimeFilter<"UsageLog"> | Date | string
    endpoint?: XOR<EndpointScalarRelationFilter, EndpointWhereInput>
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
  }

  export type UsageLogOrderByWithRelationInput = {
    id?: SortOrder
    endpointId?: SortOrder
    projectId?: SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    statusCode?: SortOrder
    responseTimeMs?: SortOrder
    rateLimitHit?: SortOrder
    timestamp?: SortOrder
    endpoint?: EndpointOrderByWithRelationInput
    project?: ProjectOrderByWithRelationInput
  }

  export type UsageLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: UsageLogWhereInput | UsageLogWhereInput[]
    OR?: UsageLogWhereInput[]
    NOT?: UsageLogWhereInput | UsageLogWhereInput[]
    endpointId?: StringFilter<"UsageLog"> | string
    projectId?: StringFilter<"UsageLog"> | string
    ipAddress?: StringNullableFilter<"UsageLog"> | string | null
    userAgent?: StringNullableFilter<"UsageLog"> | string | null
    statusCode?: IntFilter<"UsageLog"> | number
    responseTimeMs?: IntFilter<"UsageLog"> | number
    rateLimitHit?: BoolFilter<"UsageLog"> | boolean
    timestamp?: DateTimeFilter<"UsageLog"> | Date | string
    endpoint?: XOR<EndpointScalarRelationFilter, EndpointWhereInput>
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
  }, "id">

  export type UsageLogOrderByWithAggregationInput = {
    id?: SortOrder
    endpointId?: SortOrder
    projectId?: SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    statusCode?: SortOrder
    responseTimeMs?: SortOrder
    rateLimitHit?: SortOrder
    timestamp?: SortOrder
    _count?: UsageLogCountOrderByAggregateInput
    _avg?: UsageLogAvgOrderByAggregateInput
    _max?: UsageLogMaxOrderByAggregateInput
    _min?: UsageLogMinOrderByAggregateInput
    _sum?: UsageLogSumOrderByAggregateInput
  }

  export type UsageLogScalarWhereWithAggregatesInput = {
    AND?: UsageLogScalarWhereWithAggregatesInput | UsageLogScalarWhereWithAggregatesInput[]
    OR?: UsageLogScalarWhereWithAggregatesInput[]
    NOT?: UsageLogScalarWhereWithAggregatesInput | UsageLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UsageLog"> | string
    endpointId?: StringWithAggregatesFilter<"UsageLog"> | string
    projectId?: StringWithAggregatesFilter<"UsageLog"> | string
    ipAddress?: StringNullableWithAggregatesFilter<"UsageLog"> | string | null
    userAgent?: StringNullableWithAggregatesFilter<"UsageLog"> | string | null
    statusCode?: IntWithAggregatesFilter<"UsageLog"> | number
    responseTimeMs?: IntWithAggregatesFilter<"UsageLog"> | number
    rateLimitHit?: BoolWithAggregatesFilter<"UsageLog"> | boolean
    timestamp?: DateTimeWithAggregatesFilter<"UsageLog"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    emailVerified?: boolean
    tokenVersion?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    projects?: ProjectCreateNestedManyWithoutUserInput
    otpCodes?: OtpCodeCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    emailVerified?: boolean
    tokenVersion?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    projects?: ProjectUncheckedCreateNestedManyWithoutUserInput
    otpCodes?: OtpCodeUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    tokenVersion?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    projects?: ProjectUpdateManyWithoutUserNestedInput
    otpCodes?: OtpCodeUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    tokenVersion?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    projects?: ProjectUncheckedUpdateManyWithoutUserNestedInput
    otpCodes?: OtpCodeUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    emailVerified?: boolean
    tokenVersion?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    tokenVersion?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    tokenVersion?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OtpCodeCreateInput = {
    id?: string
    code: string
    type: $Enums.OtpType
    expiresAt: Date | string
    usedAt?: Date | string | null
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutOtpCodesInput
  }

  export type OtpCodeUncheckedCreateInput = {
    id?: string
    userId: string
    code: string
    type: $Enums.OtpType
    expiresAt: Date | string
    usedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type OtpCodeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    type?: EnumOtpTypeFieldUpdateOperationsInput | $Enums.OtpType
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutOtpCodesNestedInput
  }

  export type OtpCodeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    type?: EnumOtpTypeFieldUpdateOperationsInput | $Enums.OtpType
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OtpCodeCreateManyInput = {
    id?: string
    userId: string
    code: string
    type: $Enums.OtpType
    expiresAt: Date | string
    usedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type OtpCodeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    type?: EnumOtpTypeFieldUpdateOperationsInput | $Enums.OtpType
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OtpCodeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    type?: EnumOtpTypeFieldUpdateOperationsInput | $Enums.OtpType
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectCreateInput = {
    id?: string
    name: string
    description?: string | null
    status?: $Enums.ProjectStatus
    defaultRateLimitMax?: number
    defaultRateLimitWindow?: number
    defaultRateLimitStrategy?: $Enums.RateLimitStrategy
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutProjectsInput
    apiKeys?: ApiKeyCreateNestedManyWithoutProjectInput
    endpoints?: EndpointCreateNestedManyWithoutProjectInput
    logs?: UsageLogCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateInput = {
    id?: string
    userId: string
    name: string
    description?: string | null
    status?: $Enums.ProjectStatus
    defaultRateLimitMax?: number
    defaultRateLimitWindow?: number
    defaultRateLimitStrategy?: $Enums.RateLimitStrategy
    createdAt?: Date | string
    updatedAt?: Date | string
    apiKeys?: ApiKeyUncheckedCreateNestedManyWithoutProjectInput
    endpoints?: EndpointUncheckedCreateNestedManyWithoutProjectInput
    logs?: UsageLogUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    defaultRateLimitMax?: IntFieldUpdateOperationsInput | number
    defaultRateLimitWindow?: IntFieldUpdateOperationsInput | number
    defaultRateLimitStrategy?: EnumRateLimitStrategyFieldUpdateOperationsInput | $Enums.RateLimitStrategy
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutProjectsNestedInput
    apiKeys?: ApiKeyUpdateManyWithoutProjectNestedInput
    endpoints?: EndpointUpdateManyWithoutProjectNestedInput
    logs?: UsageLogUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    defaultRateLimitMax?: IntFieldUpdateOperationsInput | number
    defaultRateLimitWindow?: IntFieldUpdateOperationsInput | number
    defaultRateLimitStrategy?: EnumRateLimitStrategyFieldUpdateOperationsInput | $Enums.RateLimitStrategy
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    apiKeys?: ApiKeyUncheckedUpdateManyWithoutProjectNestedInput
    endpoints?: EndpointUncheckedUpdateManyWithoutProjectNestedInput
    logs?: UsageLogUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type ProjectCreateManyInput = {
    id?: string
    userId: string
    name: string
    description?: string | null
    status?: $Enums.ProjectStatus
    defaultRateLimitMax?: number
    defaultRateLimitWindow?: number
    defaultRateLimitStrategy?: $Enums.RateLimitStrategy
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    defaultRateLimitMax?: IntFieldUpdateOperationsInput | number
    defaultRateLimitWindow?: IntFieldUpdateOperationsInput | number
    defaultRateLimitStrategy?: EnumRateLimitStrategyFieldUpdateOperationsInput | $Enums.RateLimitStrategy
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    defaultRateLimitMax?: IntFieldUpdateOperationsInput | number
    defaultRateLimitWindow?: IntFieldUpdateOperationsInput | number
    defaultRateLimitStrategy?: EnumRateLimitStrategyFieldUpdateOperationsInput | $Enums.RateLimitStrategy
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApiKeyCreateInput = {
    id?: string
    name: string
    keyHash: string
    keyPrefix: string
    lastUsedAt?: Date | string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    project: ProjectCreateNestedOneWithoutApiKeysInput
  }

  export type ApiKeyUncheckedCreateInput = {
    id?: string
    projectId: string
    name: string
    keyHash: string
    keyPrefix: string
    lastUsedAt?: Date | string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ApiKeyUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    keyHash?: StringFieldUpdateOperationsInput | string
    keyPrefix?: StringFieldUpdateOperationsInput | string
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: ProjectUpdateOneRequiredWithoutApiKeysNestedInput
  }

  export type ApiKeyUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    keyHash?: StringFieldUpdateOperationsInput | string
    keyPrefix?: StringFieldUpdateOperationsInput | string
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApiKeyCreateManyInput = {
    id?: string
    projectId: string
    name: string
    keyHash: string
    keyPrefix: string
    lastUsedAt?: Date | string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ApiKeyUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    keyHash?: StringFieldUpdateOperationsInput | string
    keyPrefix?: StringFieldUpdateOperationsInput | string
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApiKeyUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    keyHash?: StringFieldUpdateOperationsInput | string
    keyPrefix?: StringFieldUpdateOperationsInput | string
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EndpointCreateInput = {
    id?: string
    path: string
    method: $Enums.HttpMethod
    responseSchema: JsonNullValueInput | InputJsonValue
    statusCode?: number
    delayMs?: number
    rateLimitEnabled?: boolean
    rateLimitStrategy?: $Enums.RateLimitStrategy
    rateLimitMax?: number
    rateLimitWindow?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    project: ProjectCreateNestedOneWithoutEndpointsInput
    logs?: UsageLogCreateNestedManyWithoutEndpointInput
  }

  export type EndpointUncheckedCreateInput = {
    id?: string
    projectId: string
    path: string
    method: $Enums.HttpMethod
    responseSchema: JsonNullValueInput | InputJsonValue
    statusCode?: number
    delayMs?: number
    rateLimitEnabled?: boolean
    rateLimitStrategy?: $Enums.RateLimitStrategy
    rateLimitMax?: number
    rateLimitWindow?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    logs?: UsageLogUncheckedCreateNestedManyWithoutEndpointInput
  }

  export type EndpointUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    path?: StringFieldUpdateOperationsInput | string
    method?: EnumHttpMethodFieldUpdateOperationsInput | $Enums.HttpMethod
    responseSchema?: JsonNullValueInput | InputJsonValue
    statusCode?: IntFieldUpdateOperationsInput | number
    delayMs?: IntFieldUpdateOperationsInput | number
    rateLimitEnabled?: BoolFieldUpdateOperationsInput | boolean
    rateLimitStrategy?: EnumRateLimitStrategyFieldUpdateOperationsInput | $Enums.RateLimitStrategy
    rateLimitMax?: IntFieldUpdateOperationsInput | number
    rateLimitWindow?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: ProjectUpdateOneRequiredWithoutEndpointsNestedInput
    logs?: UsageLogUpdateManyWithoutEndpointNestedInput
  }

  export type EndpointUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    path?: StringFieldUpdateOperationsInput | string
    method?: EnumHttpMethodFieldUpdateOperationsInput | $Enums.HttpMethod
    responseSchema?: JsonNullValueInput | InputJsonValue
    statusCode?: IntFieldUpdateOperationsInput | number
    delayMs?: IntFieldUpdateOperationsInput | number
    rateLimitEnabled?: BoolFieldUpdateOperationsInput | boolean
    rateLimitStrategy?: EnumRateLimitStrategyFieldUpdateOperationsInput | $Enums.RateLimitStrategy
    rateLimitMax?: IntFieldUpdateOperationsInput | number
    rateLimitWindow?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    logs?: UsageLogUncheckedUpdateManyWithoutEndpointNestedInput
  }

  export type EndpointCreateManyInput = {
    id?: string
    projectId: string
    path: string
    method: $Enums.HttpMethod
    responseSchema: JsonNullValueInput | InputJsonValue
    statusCode?: number
    delayMs?: number
    rateLimitEnabled?: boolean
    rateLimitStrategy?: $Enums.RateLimitStrategy
    rateLimitMax?: number
    rateLimitWindow?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EndpointUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    path?: StringFieldUpdateOperationsInput | string
    method?: EnumHttpMethodFieldUpdateOperationsInput | $Enums.HttpMethod
    responseSchema?: JsonNullValueInput | InputJsonValue
    statusCode?: IntFieldUpdateOperationsInput | number
    delayMs?: IntFieldUpdateOperationsInput | number
    rateLimitEnabled?: BoolFieldUpdateOperationsInput | boolean
    rateLimitStrategy?: EnumRateLimitStrategyFieldUpdateOperationsInput | $Enums.RateLimitStrategy
    rateLimitMax?: IntFieldUpdateOperationsInput | number
    rateLimitWindow?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EndpointUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    path?: StringFieldUpdateOperationsInput | string
    method?: EnumHttpMethodFieldUpdateOperationsInput | $Enums.HttpMethod
    responseSchema?: JsonNullValueInput | InputJsonValue
    statusCode?: IntFieldUpdateOperationsInput | number
    delayMs?: IntFieldUpdateOperationsInput | number
    rateLimitEnabled?: BoolFieldUpdateOperationsInput | boolean
    rateLimitStrategy?: EnumRateLimitStrategyFieldUpdateOperationsInput | $Enums.RateLimitStrategy
    rateLimitMax?: IntFieldUpdateOperationsInput | number
    rateLimitWindow?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsageLogCreateInput = {
    id?: string
    ipAddress?: string | null
    userAgent?: string | null
    statusCode: number
    responseTimeMs: number
    rateLimitHit?: boolean
    timestamp?: Date | string
    endpoint: EndpointCreateNestedOneWithoutLogsInput
    project: ProjectCreateNestedOneWithoutLogsInput
  }

  export type UsageLogUncheckedCreateInput = {
    id?: string
    endpointId: string
    projectId: string
    ipAddress?: string | null
    userAgent?: string | null
    statusCode: number
    responseTimeMs: number
    rateLimitHit?: boolean
    timestamp?: Date | string
  }

  export type UsageLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    statusCode?: IntFieldUpdateOperationsInput | number
    responseTimeMs?: IntFieldUpdateOperationsInput | number
    rateLimitHit?: BoolFieldUpdateOperationsInput | boolean
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    endpoint?: EndpointUpdateOneRequiredWithoutLogsNestedInput
    project?: ProjectUpdateOneRequiredWithoutLogsNestedInput
  }

  export type UsageLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    endpointId?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    statusCode?: IntFieldUpdateOperationsInput | number
    responseTimeMs?: IntFieldUpdateOperationsInput | number
    rateLimitHit?: BoolFieldUpdateOperationsInput | boolean
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsageLogCreateManyInput = {
    id?: string
    endpointId: string
    projectId: string
    ipAddress?: string | null
    userAgent?: string | null
    statusCode: number
    responseTimeMs: number
    rateLimitHit?: boolean
    timestamp?: Date | string
  }

  export type UsageLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    statusCode?: IntFieldUpdateOperationsInput | number
    responseTimeMs?: IntFieldUpdateOperationsInput | number
    rateLimitHit?: BoolFieldUpdateOperationsInput | boolean
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsageLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    endpointId?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    statusCode?: IntFieldUpdateOperationsInput | number
    responseTimeMs?: IntFieldUpdateOperationsInput | number
    rateLimitHit?: BoolFieldUpdateOperationsInput | boolean
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type ProjectListRelationFilter = {
    every?: ProjectWhereInput
    some?: ProjectWhereInput
    none?: ProjectWhereInput
  }

  export type OtpCodeListRelationFilter = {
    every?: OtpCodeWhereInput
    some?: OtpCodeWhereInput
    none?: OtpCodeWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ProjectOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OtpCodeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    emailVerified?: SortOrder
    tokenVersion?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    tokenVersion?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    emailVerified?: SortOrder
    tokenVersion?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    emailVerified?: SortOrder
    tokenVersion?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    tokenVersion?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumOtpTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.OtpType | EnumOtpTypeFieldRefInput<$PrismaModel>
    in?: $Enums.OtpType[] | ListEnumOtpTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.OtpType[] | ListEnumOtpTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumOtpTypeFilter<$PrismaModel> | $Enums.OtpType
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type OtpCodeCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    code?: SortOrder
    type?: SortOrder
    expiresAt?: SortOrder
    usedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type OtpCodeMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    code?: SortOrder
    type?: SortOrder
    expiresAt?: SortOrder
    usedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type OtpCodeMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    code?: SortOrder
    type?: SortOrder
    expiresAt?: SortOrder
    usedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumOtpTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OtpType | EnumOtpTypeFieldRefInput<$PrismaModel>
    in?: $Enums.OtpType[] | ListEnumOtpTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.OtpType[] | ListEnumOtpTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumOtpTypeWithAggregatesFilter<$PrismaModel> | $Enums.OtpType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOtpTypeFilter<$PrismaModel>
    _max?: NestedEnumOtpTypeFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type EnumProjectStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ProjectStatus | EnumProjectStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ProjectStatus[] | ListEnumProjectStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProjectStatus[] | ListEnumProjectStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumProjectStatusFilter<$PrismaModel> | $Enums.ProjectStatus
  }

  export type EnumRateLimitStrategyFilter<$PrismaModel = never> = {
    equals?: $Enums.RateLimitStrategy | EnumRateLimitStrategyFieldRefInput<$PrismaModel>
    in?: $Enums.RateLimitStrategy[] | ListEnumRateLimitStrategyFieldRefInput<$PrismaModel>
    notIn?: $Enums.RateLimitStrategy[] | ListEnumRateLimitStrategyFieldRefInput<$PrismaModel>
    not?: NestedEnumRateLimitStrategyFilter<$PrismaModel> | $Enums.RateLimitStrategy
  }

  export type ApiKeyListRelationFilter = {
    every?: ApiKeyWhereInput
    some?: ApiKeyWhereInput
    none?: ApiKeyWhereInput
  }

  export type EndpointListRelationFilter = {
    every?: EndpointWhereInput
    some?: EndpointWhereInput
    none?: EndpointWhereInput
  }

  export type UsageLogListRelationFilter = {
    every?: UsageLogWhereInput
    some?: UsageLogWhereInput
    none?: UsageLogWhereInput
  }

  export type ApiKeyOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EndpointOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UsageLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProjectUserIdNameCompoundUniqueInput = {
    userId: string
    name: string
  }

  export type ProjectCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    status?: SortOrder
    defaultRateLimitMax?: SortOrder
    defaultRateLimitWindow?: SortOrder
    defaultRateLimitStrategy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProjectAvgOrderByAggregateInput = {
    defaultRateLimitMax?: SortOrder
    defaultRateLimitWindow?: SortOrder
  }

  export type ProjectMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    status?: SortOrder
    defaultRateLimitMax?: SortOrder
    defaultRateLimitWindow?: SortOrder
    defaultRateLimitStrategy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProjectMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    status?: SortOrder
    defaultRateLimitMax?: SortOrder
    defaultRateLimitWindow?: SortOrder
    defaultRateLimitStrategy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProjectSumOrderByAggregateInput = {
    defaultRateLimitMax?: SortOrder
    defaultRateLimitWindow?: SortOrder
  }

  export type EnumProjectStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProjectStatus | EnumProjectStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ProjectStatus[] | ListEnumProjectStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProjectStatus[] | ListEnumProjectStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumProjectStatusWithAggregatesFilter<$PrismaModel> | $Enums.ProjectStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumProjectStatusFilter<$PrismaModel>
    _max?: NestedEnumProjectStatusFilter<$PrismaModel>
  }

  export type EnumRateLimitStrategyWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RateLimitStrategy | EnumRateLimitStrategyFieldRefInput<$PrismaModel>
    in?: $Enums.RateLimitStrategy[] | ListEnumRateLimitStrategyFieldRefInput<$PrismaModel>
    notIn?: $Enums.RateLimitStrategy[] | ListEnumRateLimitStrategyFieldRefInput<$PrismaModel>
    not?: NestedEnumRateLimitStrategyWithAggregatesFilter<$PrismaModel> | $Enums.RateLimitStrategy
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRateLimitStrategyFilter<$PrismaModel>
    _max?: NestedEnumRateLimitStrategyFilter<$PrismaModel>
  }

  export type ProjectScalarRelationFilter = {
    is?: ProjectWhereInput
    isNot?: ProjectWhereInput
  }

  export type ApiKeyCountOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    name?: SortOrder
    keyHash?: SortOrder
    keyPrefix?: SortOrder
    lastUsedAt?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ApiKeyMaxOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    name?: SortOrder
    keyHash?: SortOrder
    keyPrefix?: SortOrder
    lastUsedAt?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ApiKeyMinOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    name?: SortOrder
    keyHash?: SortOrder
    keyPrefix?: SortOrder
    lastUsedAt?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumHttpMethodFilter<$PrismaModel = never> = {
    equals?: $Enums.HttpMethod | EnumHttpMethodFieldRefInput<$PrismaModel>
    in?: $Enums.HttpMethod[] | ListEnumHttpMethodFieldRefInput<$PrismaModel>
    notIn?: $Enums.HttpMethod[] | ListEnumHttpMethodFieldRefInput<$PrismaModel>
    not?: NestedEnumHttpMethodFilter<$PrismaModel> | $Enums.HttpMethod
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type EndpointProjectIdMethodPathCompoundUniqueInput = {
    projectId: string
    method: $Enums.HttpMethod
    path: string
  }

  export type EndpointCountOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    path?: SortOrder
    method?: SortOrder
    responseSchema?: SortOrder
    statusCode?: SortOrder
    delayMs?: SortOrder
    rateLimitEnabled?: SortOrder
    rateLimitStrategy?: SortOrder
    rateLimitMax?: SortOrder
    rateLimitWindow?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EndpointAvgOrderByAggregateInput = {
    statusCode?: SortOrder
    delayMs?: SortOrder
    rateLimitMax?: SortOrder
    rateLimitWindow?: SortOrder
  }

  export type EndpointMaxOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    path?: SortOrder
    method?: SortOrder
    statusCode?: SortOrder
    delayMs?: SortOrder
    rateLimitEnabled?: SortOrder
    rateLimitStrategy?: SortOrder
    rateLimitMax?: SortOrder
    rateLimitWindow?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EndpointMinOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    path?: SortOrder
    method?: SortOrder
    statusCode?: SortOrder
    delayMs?: SortOrder
    rateLimitEnabled?: SortOrder
    rateLimitStrategy?: SortOrder
    rateLimitMax?: SortOrder
    rateLimitWindow?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EndpointSumOrderByAggregateInput = {
    statusCode?: SortOrder
    delayMs?: SortOrder
    rateLimitMax?: SortOrder
    rateLimitWindow?: SortOrder
  }

  export type EnumHttpMethodWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.HttpMethod | EnumHttpMethodFieldRefInput<$PrismaModel>
    in?: $Enums.HttpMethod[] | ListEnumHttpMethodFieldRefInput<$PrismaModel>
    notIn?: $Enums.HttpMethod[] | ListEnumHttpMethodFieldRefInput<$PrismaModel>
    not?: NestedEnumHttpMethodWithAggregatesFilter<$PrismaModel> | $Enums.HttpMethod
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumHttpMethodFilter<$PrismaModel>
    _max?: NestedEnumHttpMethodFilter<$PrismaModel>
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type EndpointScalarRelationFilter = {
    is?: EndpointWhereInput
    isNot?: EndpointWhereInput
  }

  export type UsageLogCountOrderByAggregateInput = {
    id?: SortOrder
    endpointId?: SortOrder
    projectId?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    statusCode?: SortOrder
    responseTimeMs?: SortOrder
    rateLimitHit?: SortOrder
    timestamp?: SortOrder
  }

  export type UsageLogAvgOrderByAggregateInput = {
    statusCode?: SortOrder
    responseTimeMs?: SortOrder
  }

  export type UsageLogMaxOrderByAggregateInput = {
    id?: SortOrder
    endpointId?: SortOrder
    projectId?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    statusCode?: SortOrder
    responseTimeMs?: SortOrder
    rateLimitHit?: SortOrder
    timestamp?: SortOrder
  }

  export type UsageLogMinOrderByAggregateInput = {
    id?: SortOrder
    endpointId?: SortOrder
    projectId?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    statusCode?: SortOrder
    responseTimeMs?: SortOrder
    rateLimitHit?: SortOrder
    timestamp?: SortOrder
  }

  export type UsageLogSumOrderByAggregateInput = {
    statusCode?: SortOrder
    responseTimeMs?: SortOrder
  }

  export type ProjectCreateNestedManyWithoutUserInput = {
    create?: XOR<ProjectCreateWithoutUserInput, ProjectUncheckedCreateWithoutUserInput> | ProjectCreateWithoutUserInput[] | ProjectUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutUserInput | ProjectCreateOrConnectWithoutUserInput[]
    createMany?: ProjectCreateManyUserInputEnvelope
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
  }

  export type OtpCodeCreateNestedManyWithoutUserInput = {
    create?: XOR<OtpCodeCreateWithoutUserInput, OtpCodeUncheckedCreateWithoutUserInput> | OtpCodeCreateWithoutUserInput[] | OtpCodeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OtpCodeCreateOrConnectWithoutUserInput | OtpCodeCreateOrConnectWithoutUserInput[]
    createMany?: OtpCodeCreateManyUserInputEnvelope
    connect?: OtpCodeWhereUniqueInput | OtpCodeWhereUniqueInput[]
  }

  export type ProjectUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ProjectCreateWithoutUserInput, ProjectUncheckedCreateWithoutUserInput> | ProjectCreateWithoutUserInput[] | ProjectUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutUserInput | ProjectCreateOrConnectWithoutUserInput[]
    createMany?: ProjectCreateManyUserInputEnvelope
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
  }

  export type OtpCodeUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<OtpCodeCreateWithoutUserInput, OtpCodeUncheckedCreateWithoutUserInput> | OtpCodeCreateWithoutUserInput[] | OtpCodeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OtpCodeCreateOrConnectWithoutUserInput | OtpCodeCreateOrConnectWithoutUserInput[]
    createMany?: OtpCodeCreateManyUserInputEnvelope
    connect?: OtpCodeWhereUniqueInput | OtpCodeWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ProjectUpdateManyWithoutUserNestedInput = {
    create?: XOR<ProjectCreateWithoutUserInput, ProjectUncheckedCreateWithoutUserInput> | ProjectCreateWithoutUserInput[] | ProjectUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutUserInput | ProjectCreateOrConnectWithoutUserInput[]
    upsert?: ProjectUpsertWithWhereUniqueWithoutUserInput | ProjectUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ProjectCreateManyUserInputEnvelope
    set?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    disconnect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    delete?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    update?: ProjectUpdateWithWhereUniqueWithoutUserInput | ProjectUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ProjectUpdateManyWithWhereWithoutUserInput | ProjectUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
  }

  export type OtpCodeUpdateManyWithoutUserNestedInput = {
    create?: XOR<OtpCodeCreateWithoutUserInput, OtpCodeUncheckedCreateWithoutUserInput> | OtpCodeCreateWithoutUserInput[] | OtpCodeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OtpCodeCreateOrConnectWithoutUserInput | OtpCodeCreateOrConnectWithoutUserInput[]
    upsert?: OtpCodeUpsertWithWhereUniqueWithoutUserInput | OtpCodeUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: OtpCodeCreateManyUserInputEnvelope
    set?: OtpCodeWhereUniqueInput | OtpCodeWhereUniqueInput[]
    disconnect?: OtpCodeWhereUniqueInput | OtpCodeWhereUniqueInput[]
    delete?: OtpCodeWhereUniqueInput | OtpCodeWhereUniqueInput[]
    connect?: OtpCodeWhereUniqueInput | OtpCodeWhereUniqueInput[]
    update?: OtpCodeUpdateWithWhereUniqueWithoutUserInput | OtpCodeUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: OtpCodeUpdateManyWithWhereWithoutUserInput | OtpCodeUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: OtpCodeScalarWhereInput | OtpCodeScalarWhereInput[]
  }

  export type ProjectUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ProjectCreateWithoutUserInput, ProjectUncheckedCreateWithoutUserInput> | ProjectCreateWithoutUserInput[] | ProjectUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutUserInput | ProjectCreateOrConnectWithoutUserInput[]
    upsert?: ProjectUpsertWithWhereUniqueWithoutUserInput | ProjectUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ProjectCreateManyUserInputEnvelope
    set?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    disconnect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    delete?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    update?: ProjectUpdateWithWhereUniqueWithoutUserInput | ProjectUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ProjectUpdateManyWithWhereWithoutUserInput | ProjectUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
  }

  export type OtpCodeUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<OtpCodeCreateWithoutUserInput, OtpCodeUncheckedCreateWithoutUserInput> | OtpCodeCreateWithoutUserInput[] | OtpCodeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OtpCodeCreateOrConnectWithoutUserInput | OtpCodeCreateOrConnectWithoutUserInput[]
    upsert?: OtpCodeUpsertWithWhereUniqueWithoutUserInput | OtpCodeUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: OtpCodeCreateManyUserInputEnvelope
    set?: OtpCodeWhereUniqueInput | OtpCodeWhereUniqueInput[]
    disconnect?: OtpCodeWhereUniqueInput | OtpCodeWhereUniqueInput[]
    delete?: OtpCodeWhereUniqueInput | OtpCodeWhereUniqueInput[]
    connect?: OtpCodeWhereUniqueInput | OtpCodeWhereUniqueInput[]
    update?: OtpCodeUpdateWithWhereUniqueWithoutUserInput | OtpCodeUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: OtpCodeUpdateManyWithWhereWithoutUserInput | OtpCodeUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: OtpCodeScalarWhereInput | OtpCodeScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutOtpCodesInput = {
    create?: XOR<UserCreateWithoutOtpCodesInput, UserUncheckedCreateWithoutOtpCodesInput>
    connectOrCreate?: UserCreateOrConnectWithoutOtpCodesInput
    connect?: UserWhereUniqueInput
  }

  export type EnumOtpTypeFieldUpdateOperationsInput = {
    set?: $Enums.OtpType
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UserUpdateOneRequiredWithoutOtpCodesNestedInput = {
    create?: XOR<UserCreateWithoutOtpCodesInput, UserUncheckedCreateWithoutOtpCodesInput>
    connectOrCreate?: UserCreateOrConnectWithoutOtpCodesInput
    upsert?: UserUpsertWithoutOtpCodesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutOtpCodesInput, UserUpdateWithoutOtpCodesInput>, UserUncheckedUpdateWithoutOtpCodesInput>
  }

  export type UserCreateNestedOneWithoutProjectsInput = {
    create?: XOR<UserCreateWithoutProjectsInput, UserUncheckedCreateWithoutProjectsInput>
    connectOrCreate?: UserCreateOrConnectWithoutProjectsInput
    connect?: UserWhereUniqueInput
  }

  export type ApiKeyCreateNestedManyWithoutProjectInput = {
    create?: XOR<ApiKeyCreateWithoutProjectInput, ApiKeyUncheckedCreateWithoutProjectInput> | ApiKeyCreateWithoutProjectInput[] | ApiKeyUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ApiKeyCreateOrConnectWithoutProjectInput | ApiKeyCreateOrConnectWithoutProjectInput[]
    createMany?: ApiKeyCreateManyProjectInputEnvelope
    connect?: ApiKeyWhereUniqueInput | ApiKeyWhereUniqueInput[]
  }

  export type EndpointCreateNestedManyWithoutProjectInput = {
    create?: XOR<EndpointCreateWithoutProjectInput, EndpointUncheckedCreateWithoutProjectInput> | EndpointCreateWithoutProjectInput[] | EndpointUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: EndpointCreateOrConnectWithoutProjectInput | EndpointCreateOrConnectWithoutProjectInput[]
    createMany?: EndpointCreateManyProjectInputEnvelope
    connect?: EndpointWhereUniqueInput | EndpointWhereUniqueInput[]
  }

  export type UsageLogCreateNestedManyWithoutProjectInput = {
    create?: XOR<UsageLogCreateWithoutProjectInput, UsageLogUncheckedCreateWithoutProjectInput> | UsageLogCreateWithoutProjectInput[] | UsageLogUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: UsageLogCreateOrConnectWithoutProjectInput | UsageLogCreateOrConnectWithoutProjectInput[]
    createMany?: UsageLogCreateManyProjectInputEnvelope
    connect?: UsageLogWhereUniqueInput | UsageLogWhereUniqueInput[]
  }

  export type ApiKeyUncheckedCreateNestedManyWithoutProjectInput = {
    create?: XOR<ApiKeyCreateWithoutProjectInput, ApiKeyUncheckedCreateWithoutProjectInput> | ApiKeyCreateWithoutProjectInput[] | ApiKeyUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ApiKeyCreateOrConnectWithoutProjectInput | ApiKeyCreateOrConnectWithoutProjectInput[]
    createMany?: ApiKeyCreateManyProjectInputEnvelope
    connect?: ApiKeyWhereUniqueInput | ApiKeyWhereUniqueInput[]
  }

  export type EndpointUncheckedCreateNestedManyWithoutProjectInput = {
    create?: XOR<EndpointCreateWithoutProjectInput, EndpointUncheckedCreateWithoutProjectInput> | EndpointCreateWithoutProjectInput[] | EndpointUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: EndpointCreateOrConnectWithoutProjectInput | EndpointCreateOrConnectWithoutProjectInput[]
    createMany?: EndpointCreateManyProjectInputEnvelope
    connect?: EndpointWhereUniqueInput | EndpointWhereUniqueInput[]
  }

  export type UsageLogUncheckedCreateNestedManyWithoutProjectInput = {
    create?: XOR<UsageLogCreateWithoutProjectInput, UsageLogUncheckedCreateWithoutProjectInput> | UsageLogCreateWithoutProjectInput[] | UsageLogUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: UsageLogCreateOrConnectWithoutProjectInput | UsageLogCreateOrConnectWithoutProjectInput[]
    createMany?: UsageLogCreateManyProjectInputEnvelope
    connect?: UsageLogWhereUniqueInput | UsageLogWhereUniqueInput[]
  }

  export type EnumProjectStatusFieldUpdateOperationsInput = {
    set?: $Enums.ProjectStatus
  }

  export type EnumRateLimitStrategyFieldUpdateOperationsInput = {
    set?: $Enums.RateLimitStrategy
  }

  export type UserUpdateOneRequiredWithoutProjectsNestedInput = {
    create?: XOR<UserCreateWithoutProjectsInput, UserUncheckedCreateWithoutProjectsInput>
    connectOrCreate?: UserCreateOrConnectWithoutProjectsInput
    upsert?: UserUpsertWithoutProjectsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutProjectsInput, UserUpdateWithoutProjectsInput>, UserUncheckedUpdateWithoutProjectsInput>
  }

  export type ApiKeyUpdateManyWithoutProjectNestedInput = {
    create?: XOR<ApiKeyCreateWithoutProjectInput, ApiKeyUncheckedCreateWithoutProjectInput> | ApiKeyCreateWithoutProjectInput[] | ApiKeyUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ApiKeyCreateOrConnectWithoutProjectInput | ApiKeyCreateOrConnectWithoutProjectInput[]
    upsert?: ApiKeyUpsertWithWhereUniqueWithoutProjectInput | ApiKeyUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: ApiKeyCreateManyProjectInputEnvelope
    set?: ApiKeyWhereUniqueInput | ApiKeyWhereUniqueInput[]
    disconnect?: ApiKeyWhereUniqueInput | ApiKeyWhereUniqueInput[]
    delete?: ApiKeyWhereUniqueInput | ApiKeyWhereUniqueInput[]
    connect?: ApiKeyWhereUniqueInput | ApiKeyWhereUniqueInput[]
    update?: ApiKeyUpdateWithWhereUniqueWithoutProjectInput | ApiKeyUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: ApiKeyUpdateManyWithWhereWithoutProjectInput | ApiKeyUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: ApiKeyScalarWhereInput | ApiKeyScalarWhereInput[]
  }

  export type EndpointUpdateManyWithoutProjectNestedInput = {
    create?: XOR<EndpointCreateWithoutProjectInput, EndpointUncheckedCreateWithoutProjectInput> | EndpointCreateWithoutProjectInput[] | EndpointUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: EndpointCreateOrConnectWithoutProjectInput | EndpointCreateOrConnectWithoutProjectInput[]
    upsert?: EndpointUpsertWithWhereUniqueWithoutProjectInput | EndpointUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: EndpointCreateManyProjectInputEnvelope
    set?: EndpointWhereUniqueInput | EndpointWhereUniqueInput[]
    disconnect?: EndpointWhereUniqueInput | EndpointWhereUniqueInput[]
    delete?: EndpointWhereUniqueInput | EndpointWhereUniqueInput[]
    connect?: EndpointWhereUniqueInput | EndpointWhereUniqueInput[]
    update?: EndpointUpdateWithWhereUniqueWithoutProjectInput | EndpointUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: EndpointUpdateManyWithWhereWithoutProjectInput | EndpointUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: EndpointScalarWhereInput | EndpointScalarWhereInput[]
  }

  export type UsageLogUpdateManyWithoutProjectNestedInput = {
    create?: XOR<UsageLogCreateWithoutProjectInput, UsageLogUncheckedCreateWithoutProjectInput> | UsageLogCreateWithoutProjectInput[] | UsageLogUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: UsageLogCreateOrConnectWithoutProjectInput | UsageLogCreateOrConnectWithoutProjectInput[]
    upsert?: UsageLogUpsertWithWhereUniqueWithoutProjectInput | UsageLogUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: UsageLogCreateManyProjectInputEnvelope
    set?: UsageLogWhereUniqueInput | UsageLogWhereUniqueInput[]
    disconnect?: UsageLogWhereUniqueInput | UsageLogWhereUniqueInput[]
    delete?: UsageLogWhereUniqueInput | UsageLogWhereUniqueInput[]
    connect?: UsageLogWhereUniqueInput | UsageLogWhereUniqueInput[]
    update?: UsageLogUpdateWithWhereUniqueWithoutProjectInput | UsageLogUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: UsageLogUpdateManyWithWhereWithoutProjectInput | UsageLogUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: UsageLogScalarWhereInput | UsageLogScalarWhereInput[]
  }

  export type ApiKeyUncheckedUpdateManyWithoutProjectNestedInput = {
    create?: XOR<ApiKeyCreateWithoutProjectInput, ApiKeyUncheckedCreateWithoutProjectInput> | ApiKeyCreateWithoutProjectInput[] | ApiKeyUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ApiKeyCreateOrConnectWithoutProjectInput | ApiKeyCreateOrConnectWithoutProjectInput[]
    upsert?: ApiKeyUpsertWithWhereUniqueWithoutProjectInput | ApiKeyUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: ApiKeyCreateManyProjectInputEnvelope
    set?: ApiKeyWhereUniqueInput | ApiKeyWhereUniqueInput[]
    disconnect?: ApiKeyWhereUniqueInput | ApiKeyWhereUniqueInput[]
    delete?: ApiKeyWhereUniqueInput | ApiKeyWhereUniqueInput[]
    connect?: ApiKeyWhereUniqueInput | ApiKeyWhereUniqueInput[]
    update?: ApiKeyUpdateWithWhereUniqueWithoutProjectInput | ApiKeyUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: ApiKeyUpdateManyWithWhereWithoutProjectInput | ApiKeyUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: ApiKeyScalarWhereInput | ApiKeyScalarWhereInput[]
  }

  export type EndpointUncheckedUpdateManyWithoutProjectNestedInput = {
    create?: XOR<EndpointCreateWithoutProjectInput, EndpointUncheckedCreateWithoutProjectInput> | EndpointCreateWithoutProjectInput[] | EndpointUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: EndpointCreateOrConnectWithoutProjectInput | EndpointCreateOrConnectWithoutProjectInput[]
    upsert?: EndpointUpsertWithWhereUniqueWithoutProjectInput | EndpointUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: EndpointCreateManyProjectInputEnvelope
    set?: EndpointWhereUniqueInput | EndpointWhereUniqueInput[]
    disconnect?: EndpointWhereUniqueInput | EndpointWhereUniqueInput[]
    delete?: EndpointWhereUniqueInput | EndpointWhereUniqueInput[]
    connect?: EndpointWhereUniqueInput | EndpointWhereUniqueInput[]
    update?: EndpointUpdateWithWhereUniqueWithoutProjectInput | EndpointUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: EndpointUpdateManyWithWhereWithoutProjectInput | EndpointUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: EndpointScalarWhereInput | EndpointScalarWhereInput[]
  }

  export type UsageLogUncheckedUpdateManyWithoutProjectNestedInput = {
    create?: XOR<UsageLogCreateWithoutProjectInput, UsageLogUncheckedCreateWithoutProjectInput> | UsageLogCreateWithoutProjectInput[] | UsageLogUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: UsageLogCreateOrConnectWithoutProjectInput | UsageLogCreateOrConnectWithoutProjectInput[]
    upsert?: UsageLogUpsertWithWhereUniqueWithoutProjectInput | UsageLogUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: UsageLogCreateManyProjectInputEnvelope
    set?: UsageLogWhereUniqueInput | UsageLogWhereUniqueInput[]
    disconnect?: UsageLogWhereUniqueInput | UsageLogWhereUniqueInput[]
    delete?: UsageLogWhereUniqueInput | UsageLogWhereUniqueInput[]
    connect?: UsageLogWhereUniqueInput | UsageLogWhereUniqueInput[]
    update?: UsageLogUpdateWithWhereUniqueWithoutProjectInput | UsageLogUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: UsageLogUpdateManyWithWhereWithoutProjectInput | UsageLogUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: UsageLogScalarWhereInput | UsageLogScalarWhereInput[]
  }

  export type ProjectCreateNestedOneWithoutApiKeysInput = {
    create?: XOR<ProjectCreateWithoutApiKeysInput, ProjectUncheckedCreateWithoutApiKeysInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutApiKeysInput
    connect?: ProjectWhereUniqueInput
  }

  export type ProjectUpdateOneRequiredWithoutApiKeysNestedInput = {
    create?: XOR<ProjectCreateWithoutApiKeysInput, ProjectUncheckedCreateWithoutApiKeysInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutApiKeysInput
    upsert?: ProjectUpsertWithoutApiKeysInput
    connect?: ProjectWhereUniqueInput
    update?: XOR<XOR<ProjectUpdateToOneWithWhereWithoutApiKeysInput, ProjectUpdateWithoutApiKeysInput>, ProjectUncheckedUpdateWithoutApiKeysInput>
  }

  export type ProjectCreateNestedOneWithoutEndpointsInput = {
    create?: XOR<ProjectCreateWithoutEndpointsInput, ProjectUncheckedCreateWithoutEndpointsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutEndpointsInput
    connect?: ProjectWhereUniqueInput
  }

  export type UsageLogCreateNestedManyWithoutEndpointInput = {
    create?: XOR<UsageLogCreateWithoutEndpointInput, UsageLogUncheckedCreateWithoutEndpointInput> | UsageLogCreateWithoutEndpointInput[] | UsageLogUncheckedCreateWithoutEndpointInput[]
    connectOrCreate?: UsageLogCreateOrConnectWithoutEndpointInput | UsageLogCreateOrConnectWithoutEndpointInput[]
    createMany?: UsageLogCreateManyEndpointInputEnvelope
    connect?: UsageLogWhereUniqueInput | UsageLogWhereUniqueInput[]
  }

  export type UsageLogUncheckedCreateNestedManyWithoutEndpointInput = {
    create?: XOR<UsageLogCreateWithoutEndpointInput, UsageLogUncheckedCreateWithoutEndpointInput> | UsageLogCreateWithoutEndpointInput[] | UsageLogUncheckedCreateWithoutEndpointInput[]
    connectOrCreate?: UsageLogCreateOrConnectWithoutEndpointInput | UsageLogCreateOrConnectWithoutEndpointInput[]
    createMany?: UsageLogCreateManyEndpointInputEnvelope
    connect?: UsageLogWhereUniqueInput | UsageLogWhereUniqueInput[]
  }

  export type EnumHttpMethodFieldUpdateOperationsInput = {
    set?: $Enums.HttpMethod
  }

  export type ProjectUpdateOneRequiredWithoutEndpointsNestedInput = {
    create?: XOR<ProjectCreateWithoutEndpointsInput, ProjectUncheckedCreateWithoutEndpointsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutEndpointsInput
    upsert?: ProjectUpsertWithoutEndpointsInput
    connect?: ProjectWhereUniqueInput
    update?: XOR<XOR<ProjectUpdateToOneWithWhereWithoutEndpointsInput, ProjectUpdateWithoutEndpointsInput>, ProjectUncheckedUpdateWithoutEndpointsInput>
  }

  export type UsageLogUpdateManyWithoutEndpointNestedInput = {
    create?: XOR<UsageLogCreateWithoutEndpointInput, UsageLogUncheckedCreateWithoutEndpointInput> | UsageLogCreateWithoutEndpointInput[] | UsageLogUncheckedCreateWithoutEndpointInput[]
    connectOrCreate?: UsageLogCreateOrConnectWithoutEndpointInput | UsageLogCreateOrConnectWithoutEndpointInput[]
    upsert?: UsageLogUpsertWithWhereUniqueWithoutEndpointInput | UsageLogUpsertWithWhereUniqueWithoutEndpointInput[]
    createMany?: UsageLogCreateManyEndpointInputEnvelope
    set?: UsageLogWhereUniqueInput | UsageLogWhereUniqueInput[]
    disconnect?: UsageLogWhereUniqueInput | UsageLogWhereUniqueInput[]
    delete?: UsageLogWhereUniqueInput | UsageLogWhereUniqueInput[]
    connect?: UsageLogWhereUniqueInput | UsageLogWhereUniqueInput[]
    update?: UsageLogUpdateWithWhereUniqueWithoutEndpointInput | UsageLogUpdateWithWhereUniqueWithoutEndpointInput[]
    updateMany?: UsageLogUpdateManyWithWhereWithoutEndpointInput | UsageLogUpdateManyWithWhereWithoutEndpointInput[]
    deleteMany?: UsageLogScalarWhereInput | UsageLogScalarWhereInput[]
  }

  export type UsageLogUncheckedUpdateManyWithoutEndpointNestedInput = {
    create?: XOR<UsageLogCreateWithoutEndpointInput, UsageLogUncheckedCreateWithoutEndpointInput> | UsageLogCreateWithoutEndpointInput[] | UsageLogUncheckedCreateWithoutEndpointInput[]
    connectOrCreate?: UsageLogCreateOrConnectWithoutEndpointInput | UsageLogCreateOrConnectWithoutEndpointInput[]
    upsert?: UsageLogUpsertWithWhereUniqueWithoutEndpointInput | UsageLogUpsertWithWhereUniqueWithoutEndpointInput[]
    createMany?: UsageLogCreateManyEndpointInputEnvelope
    set?: UsageLogWhereUniqueInput | UsageLogWhereUniqueInput[]
    disconnect?: UsageLogWhereUniqueInput | UsageLogWhereUniqueInput[]
    delete?: UsageLogWhereUniqueInput | UsageLogWhereUniqueInput[]
    connect?: UsageLogWhereUniqueInput | UsageLogWhereUniqueInput[]
    update?: UsageLogUpdateWithWhereUniqueWithoutEndpointInput | UsageLogUpdateWithWhereUniqueWithoutEndpointInput[]
    updateMany?: UsageLogUpdateManyWithWhereWithoutEndpointInput | UsageLogUpdateManyWithWhereWithoutEndpointInput[]
    deleteMany?: UsageLogScalarWhereInput | UsageLogScalarWhereInput[]
  }

  export type EndpointCreateNestedOneWithoutLogsInput = {
    create?: XOR<EndpointCreateWithoutLogsInput, EndpointUncheckedCreateWithoutLogsInput>
    connectOrCreate?: EndpointCreateOrConnectWithoutLogsInput
    connect?: EndpointWhereUniqueInput
  }

  export type ProjectCreateNestedOneWithoutLogsInput = {
    create?: XOR<ProjectCreateWithoutLogsInput, ProjectUncheckedCreateWithoutLogsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutLogsInput
    connect?: ProjectWhereUniqueInput
  }

  export type EndpointUpdateOneRequiredWithoutLogsNestedInput = {
    create?: XOR<EndpointCreateWithoutLogsInput, EndpointUncheckedCreateWithoutLogsInput>
    connectOrCreate?: EndpointCreateOrConnectWithoutLogsInput
    upsert?: EndpointUpsertWithoutLogsInput
    connect?: EndpointWhereUniqueInput
    update?: XOR<XOR<EndpointUpdateToOneWithWhereWithoutLogsInput, EndpointUpdateWithoutLogsInput>, EndpointUncheckedUpdateWithoutLogsInput>
  }

  export type ProjectUpdateOneRequiredWithoutLogsNestedInput = {
    create?: XOR<ProjectCreateWithoutLogsInput, ProjectUncheckedCreateWithoutLogsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutLogsInput
    upsert?: ProjectUpsertWithoutLogsInput
    connect?: ProjectWhereUniqueInput
    update?: XOR<XOR<ProjectUpdateToOneWithWhereWithoutLogsInput, ProjectUpdateWithoutLogsInput>, ProjectUncheckedUpdateWithoutLogsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumOtpTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.OtpType | EnumOtpTypeFieldRefInput<$PrismaModel>
    in?: $Enums.OtpType[] | ListEnumOtpTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.OtpType[] | ListEnumOtpTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumOtpTypeFilter<$PrismaModel> | $Enums.OtpType
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumOtpTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OtpType | EnumOtpTypeFieldRefInput<$PrismaModel>
    in?: $Enums.OtpType[] | ListEnumOtpTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.OtpType[] | ListEnumOtpTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumOtpTypeWithAggregatesFilter<$PrismaModel> | $Enums.OtpType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOtpTypeFilter<$PrismaModel>
    _max?: NestedEnumOtpTypeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumProjectStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ProjectStatus | EnumProjectStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ProjectStatus[] | ListEnumProjectStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProjectStatus[] | ListEnumProjectStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumProjectStatusFilter<$PrismaModel> | $Enums.ProjectStatus
  }

  export type NestedEnumRateLimitStrategyFilter<$PrismaModel = never> = {
    equals?: $Enums.RateLimitStrategy | EnumRateLimitStrategyFieldRefInput<$PrismaModel>
    in?: $Enums.RateLimitStrategy[] | ListEnumRateLimitStrategyFieldRefInput<$PrismaModel>
    notIn?: $Enums.RateLimitStrategy[] | ListEnumRateLimitStrategyFieldRefInput<$PrismaModel>
    not?: NestedEnumRateLimitStrategyFilter<$PrismaModel> | $Enums.RateLimitStrategy
  }

  export type NestedEnumProjectStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProjectStatus | EnumProjectStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ProjectStatus[] | ListEnumProjectStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProjectStatus[] | ListEnumProjectStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumProjectStatusWithAggregatesFilter<$PrismaModel> | $Enums.ProjectStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumProjectStatusFilter<$PrismaModel>
    _max?: NestedEnumProjectStatusFilter<$PrismaModel>
  }

  export type NestedEnumRateLimitStrategyWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RateLimitStrategy | EnumRateLimitStrategyFieldRefInput<$PrismaModel>
    in?: $Enums.RateLimitStrategy[] | ListEnumRateLimitStrategyFieldRefInput<$PrismaModel>
    notIn?: $Enums.RateLimitStrategy[] | ListEnumRateLimitStrategyFieldRefInput<$PrismaModel>
    not?: NestedEnumRateLimitStrategyWithAggregatesFilter<$PrismaModel> | $Enums.RateLimitStrategy
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRateLimitStrategyFilter<$PrismaModel>
    _max?: NestedEnumRateLimitStrategyFilter<$PrismaModel>
  }

  export type NestedEnumHttpMethodFilter<$PrismaModel = never> = {
    equals?: $Enums.HttpMethod | EnumHttpMethodFieldRefInput<$PrismaModel>
    in?: $Enums.HttpMethod[] | ListEnumHttpMethodFieldRefInput<$PrismaModel>
    notIn?: $Enums.HttpMethod[] | ListEnumHttpMethodFieldRefInput<$PrismaModel>
    not?: NestedEnumHttpMethodFilter<$PrismaModel> | $Enums.HttpMethod
  }

  export type NestedEnumHttpMethodWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.HttpMethod | EnumHttpMethodFieldRefInput<$PrismaModel>
    in?: $Enums.HttpMethod[] | ListEnumHttpMethodFieldRefInput<$PrismaModel>
    notIn?: $Enums.HttpMethod[] | ListEnumHttpMethodFieldRefInput<$PrismaModel>
    not?: NestedEnumHttpMethodWithAggregatesFilter<$PrismaModel> | $Enums.HttpMethod
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumHttpMethodFilter<$PrismaModel>
    _max?: NestedEnumHttpMethodFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type ProjectCreateWithoutUserInput = {
    id?: string
    name: string
    description?: string | null
    status?: $Enums.ProjectStatus
    defaultRateLimitMax?: number
    defaultRateLimitWindow?: number
    defaultRateLimitStrategy?: $Enums.RateLimitStrategy
    createdAt?: Date | string
    updatedAt?: Date | string
    apiKeys?: ApiKeyCreateNestedManyWithoutProjectInput
    endpoints?: EndpointCreateNestedManyWithoutProjectInput
    logs?: UsageLogCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutUserInput = {
    id?: string
    name: string
    description?: string | null
    status?: $Enums.ProjectStatus
    defaultRateLimitMax?: number
    defaultRateLimitWindow?: number
    defaultRateLimitStrategy?: $Enums.RateLimitStrategy
    createdAt?: Date | string
    updatedAt?: Date | string
    apiKeys?: ApiKeyUncheckedCreateNestedManyWithoutProjectInput
    endpoints?: EndpointUncheckedCreateNestedManyWithoutProjectInput
    logs?: UsageLogUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutUserInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutUserInput, ProjectUncheckedCreateWithoutUserInput>
  }

  export type ProjectCreateManyUserInputEnvelope = {
    data: ProjectCreateManyUserInput | ProjectCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type OtpCodeCreateWithoutUserInput = {
    id?: string
    code: string
    type: $Enums.OtpType
    expiresAt: Date | string
    usedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type OtpCodeUncheckedCreateWithoutUserInput = {
    id?: string
    code: string
    type: $Enums.OtpType
    expiresAt: Date | string
    usedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type OtpCodeCreateOrConnectWithoutUserInput = {
    where: OtpCodeWhereUniqueInput
    create: XOR<OtpCodeCreateWithoutUserInput, OtpCodeUncheckedCreateWithoutUserInput>
  }

  export type OtpCodeCreateManyUserInputEnvelope = {
    data: OtpCodeCreateManyUserInput | OtpCodeCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ProjectUpsertWithWhereUniqueWithoutUserInput = {
    where: ProjectWhereUniqueInput
    update: XOR<ProjectUpdateWithoutUserInput, ProjectUncheckedUpdateWithoutUserInput>
    create: XOR<ProjectCreateWithoutUserInput, ProjectUncheckedCreateWithoutUserInput>
  }

  export type ProjectUpdateWithWhereUniqueWithoutUserInput = {
    where: ProjectWhereUniqueInput
    data: XOR<ProjectUpdateWithoutUserInput, ProjectUncheckedUpdateWithoutUserInput>
  }

  export type ProjectUpdateManyWithWhereWithoutUserInput = {
    where: ProjectScalarWhereInput
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyWithoutUserInput>
  }

  export type ProjectScalarWhereInput = {
    AND?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
    OR?: ProjectScalarWhereInput[]
    NOT?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
    id?: StringFilter<"Project"> | string
    userId?: StringFilter<"Project"> | string
    name?: StringFilter<"Project"> | string
    description?: StringNullableFilter<"Project"> | string | null
    status?: EnumProjectStatusFilter<"Project"> | $Enums.ProjectStatus
    defaultRateLimitMax?: IntFilter<"Project"> | number
    defaultRateLimitWindow?: IntFilter<"Project"> | number
    defaultRateLimitStrategy?: EnumRateLimitStrategyFilter<"Project"> | $Enums.RateLimitStrategy
    createdAt?: DateTimeFilter<"Project"> | Date | string
    updatedAt?: DateTimeFilter<"Project"> | Date | string
  }

  export type OtpCodeUpsertWithWhereUniqueWithoutUserInput = {
    where: OtpCodeWhereUniqueInput
    update: XOR<OtpCodeUpdateWithoutUserInput, OtpCodeUncheckedUpdateWithoutUserInput>
    create: XOR<OtpCodeCreateWithoutUserInput, OtpCodeUncheckedCreateWithoutUserInput>
  }

  export type OtpCodeUpdateWithWhereUniqueWithoutUserInput = {
    where: OtpCodeWhereUniqueInput
    data: XOR<OtpCodeUpdateWithoutUserInput, OtpCodeUncheckedUpdateWithoutUserInput>
  }

  export type OtpCodeUpdateManyWithWhereWithoutUserInput = {
    where: OtpCodeScalarWhereInput
    data: XOR<OtpCodeUpdateManyMutationInput, OtpCodeUncheckedUpdateManyWithoutUserInput>
  }

  export type OtpCodeScalarWhereInput = {
    AND?: OtpCodeScalarWhereInput | OtpCodeScalarWhereInput[]
    OR?: OtpCodeScalarWhereInput[]
    NOT?: OtpCodeScalarWhereInput | OtpCodeScalarWhereInput[]
    id?: StringFilter<"OtpCode"> | string
    userId?: StringFilter<"OtpCode"> | string
    code?: StringFilter<"OtpCode"> | string
    type?: EnumOtpTypeFilter<"OtpCode"> | $Enums.OtpType
    expiresAt?: DateTimeFilter<"OtpCode"> | Date | string
    usedAt?: DateTimeNullableFilter<"OtpCode"> | Date | string | null
    createdAt?: DateTimeFilter<"OtpCode"> | Date | string
  }

  export type UserCreateWithoutOtpCodesInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    emailVerified?: boolean
    tokenVersion?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    projects?: ProjectCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutOtpCodesInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    emailVerified?: boolean
    tokenVersion?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    projects?: ProjectUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutOtpCodesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutOtpCodesInput, UserUncheckedCreateWithoutOtpCodesInput>
  }

  export type UserUpsertWithoutOtpCodesInput = {
    update: XOR<UserUpdateWithoutOtpCodesInput, UserUncheckedUpdateWithoutOtpCodesInput>
    create: XOR<UserCreateWithoutOtpCodesInput, UserUncheckedCreateWithoutOtpCodesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutOtpCodesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutOtpCodesInput, UserUncheckedUpdateWithoutOtpCodesInput>
  }

  export type UserUpdateWithoutOtpCodesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    tokenVersion?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    projects?: ProjectUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutOtpCodesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    tokenVersion?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    projects?: ProjectUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutProjectsInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    emailVerified?: boolean
    tokenVersion?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    otpCodes?: OtpCodeCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutProjectsInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    emailVerified?: boolean
    tokenVersion?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    otpCodes?: OtpCodeUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutProjectsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutProjectsInput, UserUncheckedCreateWithoutProjectsInput>
  }

  export type ApiKeyCreateWithoutProjectInput = {
    id?: string
    name: string
    keyHash: string
    keyPrefix: string
    lastUsedAt?: Date | string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ApiKeyUncheckedCreateWithoutProjectInput = {
    id?: string
    name: string
    keyHash: string
    keyPrefix: string
    lastUsedAt?: Date | string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ApiKeyCreateOrConnectWithoutProjectInput = {
    where: ApiKeyWhereUniqueInput
    create: XOR<ApiKeyCreateWithoutProjectInput, ApiKeyUncheckedCreateWithoutProjectInput>
  }

  export type ApiKeyCreateManyProjectInputEnvelope = {
    data: ApiKeyCreateManyProjectInput | ApiKeyCreateManyProjectInput[]
    skipDuplicates?: boolean
  }

  export type EndpointCreateWithoutProjectInput = {
    id?: string
    path: string
    method: $Enums.HttpMethod
    responseSchema: JsonNullValueInput | InputJsonValue
    statusCode?: number
    delayMs?: number
    rateLimitEnabled?: boolean
    rateLimitStrategy?: $Enums.RateLimitStrategy
    rateLimitMax?: number
    rateLimitWindow?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    logs?: UsageLogCreateNestedManyWithoutEndpointInput
  }

  export type EndpointUncheckedCreateWithoutProjectInput = {
    id?: string
    path: string
    method: $Enums.HttpMethod
    responseSchema: JsonNullValueInput | InputJsonValue
    statusCode?: number
    delayMs?: number
    rateLimitEnabled?: boolean
    rateLimitStrategy?: $Enums.RateLimitStrategy
    rateLimitMax?: number
    rateLimitWindow?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    logs?: UsageLogUncheckedCreateNestedManyWithoutEndpointInput
  }

  export type EndpointCreateOrConnectWithoutProjectInput = {
    where: EndpointWhereUniqueInput
    create: XOR<EndpointCreateWithoutProjectInput, EndpointUncheckedCreateWithoutProjectInput>
  }

  export type EndpointCreateManyProjectInputEnvelope = {
    data: EndpointCreateManyProjectInput | EndpointCreateManyProjectInput[]
    skipDuplicates?: boolean
  }

  export type UsageLogCreateWithoutProjectInput = {
    id?: string
    ipAddress?: string | null
    userAgent?: string | null
    statusCode: number
    responseTimeMs: number
    rateLimitHit?: boolean
    timestamp?: Date | string
    endpoint: EndpointCreateNestedOneWithoutLogsInput
  }

  export type UsageLogUncheckedCreateWithoutProjectInput = {
    id?: string
    endpointId: string
    ipAddress?: string | null
    userAgent?: string | null
    statusCode: number
    responseTimeMs: number
    rateLimitHit?: boolean
    timestamp?: Date | string
  }

  export type UsageLogCreateOrConnectWithoutProjectInput = {
    where: UsageLogWhereUniqueInput
    create: XOR<UsageLogCreateWithoutProjectInput, UsageLogUncheckedCreateWithoutProjectInput>
  }

  export type UsageLogCreateManyProjectInputEnvelope = {
    data: UsageLogCreateManyProjectInput | UsageLogCreateManyProjectInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutProjectsInput = {
    update: XOR<UserUpdateWithoutProjectsInput, UserUncheckedUpdateWithoutProjectsInput>
    create: XOR<UserCreateWithoutProjectsInput, UserUncheckedCreateWithoutProjectsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutProjectsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutProjectsInput, UserUncheckedUpdateWithoutProjectsInput>
  }

  export type UserUpdateWithoutProjectsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    tokenVersion?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    otpCodes?: OtpCodeUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutProjectsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    tokenVersion?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    otpCodes?: OtpCodeUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ApiKeyUpsertWithWhereUniqueWithoutProjectInput = {
    where: ApiKeyWhereUniqueInput
    update: XOR<ApiKeyUpdateWithoutProjectInput, ApiKeyUncheckedUpdateWithoutProjectInput>
    create: XOR<ApiKeyCreateWithoutProjectInput, ApiKeyUncheckedCreateWithoutProjectInput>
  }

  export type ApiKeyUpdateWithWhereUniqueWithoutProjectInput = {
    where: ApiKeyWhereUniqueInput
    data: XOR<ApiKeyUpdateWithoutProjectInput, ApiKeyUncheckedUpdateWithoutProjectInput>
  }

  export type ApiKeyUpdateManyWithWhereWithoutProjectInput = {
    where: ApiKeyScalarWhereInput
    data: XOR<ApiKeyUpdateManyMutationInput, ApiKeyUncheckedUpdateManyWithoutProjectInput>
  }

  export type ApiKeyScalarWhereInput = {
    AND?: ApiKeyScalarWhereInput | ApiKeyScalarWhereInput[]
    OR?: ApiKeyScalarWhereInput[]
    NOT?: ApiKeyScalarWhereInput | ApiKeyScalarWhereInput[]
    id?: StringFilter<"ApiKey"> | string
    projectId?: StringFilter<"ApiKey"> | string
    name?: StringFilter<"ApiKey"> | string
    keyHash?: StringFilter<"ApiKey"> | string
    keyPrefix?: StringFilter<"ApiKey"> | string
    lastUsedAt?: DateTimeNullableFilter<"ApiKey"> | Date | string | null
    isActive?: BoolFilter<"ApiKey"> | boolean
    createdAt?: DateTimeFilter<"ApiKey"> | Date | string
    updatedAt?: DateTimeFilter<"ApiKey"> | Date | string
  }

  export type EndpointUpsertWithWhereUniqueWithoutProjectInput = {
    where: EndpointWhereUniqueInput
    update: XOR<EndpointUpdateWithoutProjectInput, EndpointUncheckedUpdateWithoutProjectInput>
    create: XOR<EndpointCreateWithoutProjectInput, EndpointUncheckedCreateWithoutProjectInput>
  }

  export type EndpointUpdateWithWhereUniqueWithoutProjectInput = {
    where: EndpointWhereUniqueInput
    data: XOR<EndpointUpdateWithoutProjectInput, EndpointUncheckedUpdateWithoutProjectInput>
  }

  export type EndpointUpdateManyWithWhereWithoutProjectInput = {
    where: EndpointScalarWhereInput
    data: XOR<EndpointUpdateManyMutationInput, EndpointUncheckedUpdateManyWithoutProjectInput>
  }

  export type EndpointScalarWhereInput = {
    AND?: EndpointScalarWhereInput | EndpointScalarWhereInput[]
    OR?: EndpointScalarWhereInput[]
    NOT?: EndpointScalarWhereInput | EndpointScalarWhereInput[]
    id?: StringFilter<"Endpoint"> | string
    projectId?: StringFilter<"Endpoint"> | string
    path?: StringFilter<"Endpoint"> | string
    method?: EnumHttpMethodFilter<"Endpoint"> | $Enums.HttpMethod
    responseSchema?: JsonFilter<"Endpoint">
    statusCode?: IntFilter<"Endpoint"> | number
    delayMs?: IntFilter<"Endpoint"> | number
    rateLimitEnabled?: BoolFilter<"Endpoint"> | boolean
    rateLimitStrategy?: EnumRateLimitStrategyFilter<"Endpoint"> | $Enums.RateLimitStrategy
    rateLimitMax?: IntFilter<"Endpoint"> | number
    rateLimitWindow?: IntFilter<"Endpoint"> | number
    createdAt?: DateTimeFilter<"Endpoint"> | Date | string
    updatedAt?: DateTimeFilter<"Endpoint"> | Date | string
  }

  export type UsageLogUpsertWithWhereUniqueWithoutProjectInput = {
    where: UsageLogWhereUniqueInput
    update: XOR<UsageLogUpdateWithoutProjectInput, UsageLogUncheckedUpdateWithoutProjectInput>
    create: XOR<UsageLogCreateWithoutProjectInput, UsageLogUncheckedCreateWithoutProjectInput>
  }

  export type UsageLogUpdateWithWhereUniqueWithoutProjectInput = {
    where: UsageLogWhereUniqueInput
    data: XOR<UsageLogUpdateWithoutProjectInput, UsageLogUncheckedUpdateWithoutProjectInput>
  }

  export type UsageLogUpdateManyWithWhereWithoutProjectInput = {
    where: UsageLogScalarWhereInput
    data: XOR<UsageLogUpdateManyMutationInput, UsageLogUncheckedUpdateManyWithoutProjectInput>
  }

  export type UsageLogScalarWhereInput = {
    AND?: UsageLogScalarWhereInput | UsageLogScalarWhereInput[]
    OR?: UsageLogScalarWhereInput[]
    NOT?: UsageLogScalarWhereInput | UsageLogScalarWhereInput[]
    id?: StringFilter<"UsageLog"> | string
    endpointId?: StringFilter<"UsageLog"> | string
    projectId?: StringFilter<"UsageLog"> | string
    ipAddress?: StringNullableFilter<"UsageLog"> | string | null
    userAgent?: StringNullableFilter<"UsageLog"> | string | null
    statusCode?: IntFilter<"UsageLog"> | number
    responseTimeMs?: IntFilter<"UsageLog"> | number
    rateLimitHit?: BoolFilter<"UsageLog"> | boolean
    timestamp?: DateTimeFilter<"UsageLog"> | Date | string
  }

  export type ProjectCreateWithoutApiKeysInput = {
    id?: string
    name: string
    description?: string | null
    status?: $Enums.ProjectStatus
    defaultRateLimitMax?: number
    defaultRateLimitWindow?: number
    defaultRateLimitStrategy?: $Enums.RateLimitStrategy
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutProjectsInput
    endpoints?: EndpointCreateNestedManyWithoutProjectInput
    logs?: UsageLogCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutApiKeysInput = {
    id?: string
    userId: string
    name: string
    description?: string | null
    status?: $Enums.ProjectStatus
    defaultRateLimitMax?: number
    defaultRateLimitWindow?: number
    defaultRateLimitStrategy?: $Enums.RateLimitStrategy
    createdAt?: Date | string
    updatedAt?: Date | string
    endpoints?: EndpointUncheckedCreateNestedManyWithoutProjectInput
    logs?: UsageLogUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutApiKeysInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutApiKeysInput, ProjectUncheckedCreateWithoutApiKeysInput>
  }

  export type ProjectUpsertWithoutApiKeysInput = {
    update: XOR<ProjectUpdateWithoutApiKeysInput, ProjectUncheckedUpdateWithoutApiKeysInput>
    create: XOR<ProjectCreateWithoutApiKeysInput, ProjectUncheckedCreateWithoutApiKeysInput>
    where?: ProjectWhereInput
  }

  export type ProjectUpdateToOneWithWhereWithoutApiKeysInput = {
    where?: ProjectWhereInput
    data: XOR<ProjectUpdateWithoutApiKeysInput, ProjectUncheckedUpdateWithoutApiKeysInput>
  }

  export type ProjectUpdateWithoutApiKeysInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    defaultRateLimitMax?: IntFieldUpdateOperationsInput | number
    defaultRateLimitWindow?: IntFieldUpdateOperationsInput | number
    defaultRateLimitStrategy?: EnumRateLimitStrategyFieldUpdateOperationsInput | $Enums.RateLimitStrategy
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutProjectsNestedInput
    endpoints?: EndpointUpdateManyWithoutProjectNestedInput
    logs?: UsageLogUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutApiKeysInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    defaultRateLimitMax?: IntFieldUpdateOperationsInput | number
    defaultRateLimitWindow?: IntFieldUpdateOperationsInput | number
    defaultRateLimitStrategy?: EnumRateLimitStrategyFieldUpdateOperationsInput | $Enums.RateLimitStrategy
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endpoints?: EndpointUncheckedUpdateManyWithoutProjectNestedInput
    logs?: UsageLogUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type ProjectCreateWithoutEndpointsInput = {
    id?: string
    name: string
    description?: string | null
    status?: $Enums.ProjectStatus
    defaultRateLimitMax?: number
    defaultRateLimitWindow?: number
    defaultRateLimitStrategy?: $Enums.RateLimitStrategy
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutProjectsInput
    apiKeys?: ApiKeyCreateNestedManyWithoutProjectInput
    logs?: UsageLogCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutEndpointsInput = {
    id?: string
    userId: string
    name: string
    description?: string | null
    status?: $Enums.ProjectStatus
    defaultRateLimitMax?: number
    defaultRateLimitWindow?: number
    defaultRateLimitStrategy?: $Enums.RateLimitStrategy
    createdAt?: Date | string
    updatedAt?: Date | string
    apiKeys?: ApiKeyUncheckedCreateNestedManyWithoutProjectInput
    logs?: UsageLogUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutEndpointsInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutEndpointsInput, ProjectUncheckedCreateWithoutEndpointsInput>
  }

  export type UsageLogCreateWithoutEndpointInput = {
    id?: string
    ipAddress?: string | null
    userAgent?: string | null
    statusCode: number
    responseTimeMs: number
    rateLimitHit?: boolean
    timestamp?: Date | string
    project: ProjectCreateNestedOneWithoutLogsInput
  }

  export type UsageLogUncheckedCreateWithoutEndpointInput = {
    id?: string
    projectId: string
    ipAddress?: string | null
    userAgent?: string | null
    statusCode: number
    responseTimeMs: number
    rateLimitHit?: boolean
    timestamp?: Date | string
  }

  export type UsageLogCreateOrConnectWithoutEndpointInput = {
    where: UsageLogWhereUniqueInput
    create: XOR<UsageLogCreateWithoutEndpointInput, UsageLogUncheckedCreateWithoutEndpointInput>
  }

  export type UsageLogCreateManyEndpointInputEnvelope = {
    data: UsageLogCreateManyEndpointInput | UsageLogCreateManyEndpointInput[]
    skipDuplicates?: boolean
  }

  export type ProjectUpsertWithoutEndpointsInput = {
    update: XOR<ProjectUpdateWithoutEndpointsInput, ProjectUncheckedUpdateWithoutEndpointsInput>
    create: XOR<ProjectCreateWithoutEndpointsInput, ProjectUncheckedCreateWithoutEndpointsInput>
    where?: ProjectWhereInput
  }

  export type ProjectUpdateToOneWithWhereWithoutEndpointsInput = {
    where?: ProjectWhereInput
    data: XOR<ProjectUpdateWithoutEndpointsInput, ProjectUncheckedUpdateWithoutEndpointsInput>
  }

  export type ProjectUpdateWithoutEndpointsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    defaultRateLimitMax?: IntFieldUpdateOperationsInput | number
    defaultRateLimitWindow?: IntFieldUpdateOperationsInput | number
    defaultRateLimitStrategy?: EnumRateLimitStrategyFieldUpdateOperationsInput | $Enums.RateLimitStrategy
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutProjectsNestedInput
    apiKeys?: ApiKeyUpdateManyWithoutProjectNestedInput
    logs?: UsageLogUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutEndpointsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    defaultRateLimitMax?: IntFieldUpdateOperationsInput | number
    defaultRateLimitWindow?: IntFieldUpdateOperationsInput | number
    defaultRateLimitStrategy?: EnumRateLimitStrategyFieldUpdateOperationsInput | $Enums.RateLimitStrategy
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    apiKeys?: ApiKeyUncheckedUpdateManyWithoutProjectNestedInput
    logs?: UsageLogUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type UsageLogUpsertWithWhereUniqueWithoutEndpointInput = {
    where: UsageLogWhereUniqueInput
    update: XOR<UsageLogUpdateWithoutEndpointInput, UsageLogUncheckedUpdateWithoutEndpointInput>
    create: XOR<UsageLogCreateWithoutEndpointInput, UsageLogUncheckedCreateWithoutEndpointInput>
  }

  export type UsageLogUpdateWithWhereUniqueWithoutEndpointInput = {
    where: UsageLogWhereUniqueInput
    data: XOR<UsageLogUpdateWithoutEndpointInput, UsageLogUncheckedUpdateWithoutEndpointInput>
  }

  export type UsageLogUpdateManyWithWhereWithoutEndpointInput = {
    where: UsageLogScalarWhereInput
    data: XOR<UsageLogUpdateManyMutationInput, UsageLogUncheckedUpdateManyWithoutEndpointInput>
  }

  export type EndpointCreateWithoutLogsInput = {
    id?: string
    path: string
    method: $Enums.HttpMethod
    responseSchema: JsonNullValueInput | InputJsonValue
    statusCode?: number
    delayMs?: number
    rateLimitEnabled?: boolean
    rateLimitStrategy?: $Enums.RateLimitStrategy
    rateLimitMax?: number
    rateLimitWindow?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    project: ProjectCreateNestedOneWithoutEndpointsInput
  }

  export type EndpointUncheckedCreateWithoutLogsInput = {
    id?: string
    projectId: string
    path: string
    method: $Enums.HttpMethod
    responseSchema: JsonNullValueInput | InputJsonValue
    statusCode?: number
    delayMs?: number
    rateLimitEnabled?: boolean
    rateLimitStrategy?: $Enums.RateLimitStrategy
    rateLimitMax?: number
    rateLimitWindow?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EndpointCreateOrConnectWithoutLogsInput = {
    where: EndpointWhereUniqueInput
    create: XOR<EndpointCreateWithoutLogsInput, EndpointUncheckedCreateWithoutLogsInput>
  }

  export type ProjectCreateWithoutLogsInput = {
    id?: string
    name: string
    description?: string | null
    status?: $Enums.ProjectStatus
    defaultRateLimitMax?: number
    defaultRateLimitWindow?: number
    defaultRateLimitStrategy?: $Enums.RateLimitStrategy
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutProjectsInput
    apiKeys?: ApiKeyCreateNestedManyWithoutProjectInput
    endpoints?: EndpointCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutLogsInput = {
    id?: string
    userId: string
    name: string
    description?: string | null
    status?: $Enums.ProjectStatus
    defaultRateLimitMax?: number
    defaultRateLimitWindow?: number
    defaultRateLimitStrategy?: $Enums.RateLimitStrategy
    createdAt?: Date | string
    updatedAt?: Date | string
    apiKeys?: ApiKeyUncheckedCreateNestedManyWithoutProjectInput
    endpoints?: EndpointUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutLogsInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutLogsInput, ProjectUncheckedCreateWithoutLogsInput>
  }

  export type EndpointUpsertWithoutLogsInput = {
    update: XOR<EndpointUpdateWithoutLogsInput, EndpointUncheckedUpdateWithoutLogsInput>
    create: XOR<EndpointCreateWithoutLogsInput, EndpointUncheckedCreateWithoutLogsInput>
    where?: EndpointWhereInput
  }

  export type EndpointUpdateToOneWithWhereWithoutLogsInput = {
    where?: EndpointWhereInput
    data: XOR<EndpointUpdateWithoutLogsInput, EndpointUncheckedUpdateWithoutLogsInput>
  }

  export type EndpointUpdateWithoutLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    path?: StringFieldUpdateOperationsInput | string
    method?: EnumHttpMethodFieldUpdateOperationsInput | $Enums.HttpMethod
    responseSchema?: JsonNullValueInput | InputJsonValue
    statusCode?: IntFieldUpdateOperationsInput | number
    delayMs?: IntFieldUpdateOperationsInput | number
    rateLimitEnabled?: BoolFieldUpdateOperationsInput | boolean
    rateLimitStrategy?: EnumRateLimitStrategyFieldUpdateOperationsInput | $Enums.RateLimitStrategy
    rateLimitMax?: IntFieldUpdateOperationsInput | number
    rateLimitWindow?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: ProjectUpdateOneRequiredWithoutEndpointsNestedInput
  }

  export type EndpointUncheckedUpdateWithoutLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    path?: StringFieldUpdateOperationsInput | string
    method?: EnumHttpMethodFieldUpdateOperationsInput | $Enums.HttpMethod
    responseSchema?: JsonNullValueInput | InputJsonValue
    statusCode?: IntFieldUpdateOperationsInput | number
    delayMs?: IntFieldUpdateOperationsInput | number
    rateLimitEnabled?: BoolFieldUpdateOperationsInput | boolean
    rateLimitStrategy?: EnumRateLimitStrategyFieldUpdateOperationsInput | $Enums.RateLimitStrategy
    rateLimitMax?: IntFieldUpdateOperationsInput | number
    rateLimitWindow?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectUpsertWithoutLogsInput = {
    update: XOR<ProjectUpdateWithoutLogsInput, ProjectUncheckedUpdateWithoutLogsInput>
    create: XOR<ProjectCreateWithoutLogsInput, ProjectUncheckedCreateWithoutLogsInput>
    where?: ProjectWhereInput
  }

  export type ProjectUpdateToOneWithWhereWithoutLogsInput = {
    where?: ProjectWhereInput
    data: XOR<ProjectUpdateWithoutLogsInput, ProjectUncheckedUpdateWithoutLogsInput>
  }

  export type ProjectUpdateWithoutLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    defaultRateLimitMax?: IntFieldUpdateOperationsInput | number
    defaultRateLimitWindow?: IntFieldUpdateOperationsInput | number
    defaultRateLimitStrategy?: EnumRateLimitStrategyFieldUpdateOperationsInput | $Enums.RateLimitStrategy
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutProjectsNestedInput
    apiKeys?: ApiKeyUpdateManyWithoutProjectNestedInput
    endpoints?: EndpointUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    defaultRateLimitMax?: IntFieldUpdateOperationsInput | number
    defaultRateLimitWindow?: IntFieldUpdateOperationsInput | number
    defaultRateLimitStrategy?: EnumRateLimitStrategyFieldUpdateOperationsInput | $Enums.RateLimitStrategy
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    apiKeys?: ApiKeyUncheckedUpdateManyWithoutProjectNestedInput
    endpoints?: EndpointUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type ProjectCreateManyUserInput = {
    id?: string
    name: string
    description?: string | null
    status?: $Enums.ProjectStatus
    defaultRateLimitMax?: number
    defaultRateLimitWindow?: number
    defaultRateLimitStrategy?: $Enums.RateLimitStrategy
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OtpCodeCreateManyUserInput = {
    id?: string
    code: string
    type: $Enums.OtpType
    expiresAt: Date | string
    usedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type ProjectUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    defaultRateLimitMax?: IntFieldUpdateOperationsInput | number
    defaultRateLimitWindow?: IntFieldUpdateOperationsInput | number
    defaultRateLimitStrategy?: EnumRateLimitStrategyFieldUpdateOperationsInput | $Enums.RateLimitStrategy
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    apiKeys?: ApiKeyUpdateManyWithoutProjectNestedInput
    endpoints?: EndpointUpdateManyWithoutProjectNestedInput
    logs?: UsageLogUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    defaultRateLimitMax?: IntFieldUpdateOperationsInput | number
    defaultRateLimitWindow?: IntFieldUpdateOperationsInput | number
    defaultRateLimitStrategy?: EnumRateLimitStrategyFieldUpdateOperationsInput | $Enums.RateLimitStrategy
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    apiKeys?: ApiKeyUncheckedUpdateManyWithoutProjectNestedInput
    endpoints?: EndpointUncheckedUpdateManyWithoutProjectNestedInput
    logs?: UsageLogUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    defaultRateLimitMax?: IntFieldUpdateOperationsInput | number
    defaultRateLimitWindow?: IntFieldUpdateOperationsInput | number
    defaultRateLimitStrategy?: EnumRateLimitStrategyFieldUpdateOperationsInput | $Enums.RateLimitStrategy
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OtpCodeUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    type?: EnumOtpTypeFieldUpdateOperationsInput | $Enums.OtpType
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OtpCodeUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    type?: EnumOtpTypeFieldUpdateOperationsInput | $Enums.OtpType
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OtpCodeUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    type?: EnumOtpTypeFieldUpdateOperationsInput | $Enums.OtpType
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApiKeyCreateManyProjectInput = {
    id?: string
    name: string
    keyHash: string
    keyPrefix: string
    lastUsedAt?: Date | string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EndpointCreateManyProjectInput = {
    id?: string
    path: string
    method: $Enums.HttpMethod
    responseSchema: JsonNullValueInput | InputJsonValue
    statusCode?: number
    delayMs?: number
    rateLimitEnabled?: boolean
    rateLimitStrategy?: $Enums.RateLimitStrategy
    rateLimitMax?: number
    rateLimitWindow?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UsageLogCreateManyProjectInput = {
    id?: string
    endpointId: string
    ipAddress?: string | null
    userAgent?: string | null
    statusCode: number
    responseTimeMs: number
    rateLimitHit?: boolean
    timestamp?: Date | string
  }

  export type ApiKeyUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    keyHash?: StringFieldUpdateOperationsInput | string
    keyPrefix?: StringFieldUpdateOperationsInput | string
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApiKeyUncheckedUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    keyHash?: StringFieldUpdateOperationsInput | string
    keyPrefix?: StringFieldUpdateOperationsInput | string
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApiKeyUncheckedUpdateManyWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    keyHash?: StringFieldUpdateOperationsInput | string
    keyPrefix?: StringFieldUpdateOperationsInput | string
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EndpointUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    path?: StringFieldUpdateOperationsInput | string
    method?: EnumHttpMethodFieldUpdateOperationsInput | $Enums.HttpMethod
    responseSchema?: JsonNullValueInput | InputJsonValue
    statusCode?: IntFieldUpdateOperationsInput | number
    delayMs?: IntFieldUpdateOperationsInput | number
    rateLimitEnabled?: BoolFieldUpdateOperationsInput | boolean
    rateLimitStrategy?: EnumRateLimitStrategyFieldUpdateOperationsInput | $Enums.RateLimitStrategy
    rateLimitMax?: IntFieldUpdateOperationsInput | number
    rateLimitWindow?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    logs?: UsageLogUpdateManyWithoutEndpointNestedInput
  }

  export type EndpointUncheckedUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    path?: StringFieldUpdateOperationsInput | string
    method?: EnumHttpMethodFieldUpdateOperationsInput | $Enums.HttpMethod
    responseSchema?: JsonNullValueInput | InputJsonValue
    statusCode?: IntFieldUpdateOperationsInput | number
    delayMs?: IntFieldUpdateOperationsInput | number
    rateLimitEnabled?: BoolFieldUpdateOperationsInput | boolean
    rateLimitStrategy?: EnumRateLimitStrategyFieldUpdateOperationsInput | $Enums.RateLimitStrategy
    rateLimitMax?: IntFieldUpdateOperationsInput | number
    rateLimitWindow?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    logs?: UsageLogUncheckedUpdateManyWithoutEndpointNestedInput
  }

  export type EndpointUncheckedUpdateManyWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    path?: StringFieldUpdateOperationsInput | string
    method?: EnumHttpMethodFieldUpdateOperationsInput | $Enums.HttpMethod
    responseSchema?: JsonNullValueInput | InputJsonValue
    statusCode?: IntFieldUpdateOperationsInput | number
    delayMs?: IntFieldUpdateOperationsInput | number
    rateLimitEnabled?: BoolFieldUpdateOperationsInput | boolean
    rateLimitStrategy?: EnumRateLimitStrategyFieldUpdateOperationsInput | $Enums.RateLimitStrategy
    rateLimitMax?: IntFieldUpdateOperationsInput | number
    rateLimitWindow?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsageLogUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    statusCode?: IntFieldUpdateOperationsInput | number
    responseTimeMs?: IntFieldUpdateOperationsInput | number
    rateLimitHit?: BoolFieldUpdateOperationsInput | boolean
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    endpoint?: EndpointUpdateOneRequiredWithoutLogsNestedInput
  }

  export type UsageLogUncheckedUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    endpointId?: StringFieldUpdateOperationsInput | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    statusCode?: IntFieldUpdateOperationsInput | number
    responseTimeMs?: IntFieldUpdateOperationsInput | number
    rateLimitHit?: BoolFieldUpdateOperationsInput | boolean
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsageLogUncheckedUpdateManyWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    endpointId?: StringFieldUpdateOperationsInput | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    statusCode?: IntFieldUpdateOperationsInput | number
    responseTimeMs?: IntFieldUpdateOperationsInput | number
    rateLimitHit?: BoolFieldUpdateOperationsInput | boolean
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsageLogCreateManyEndpointInput = {
    id?: string
    projectId: string
    ipAddress?: string | null
    userAgent?: string | null
    statusCode: number
    responseTimeMs: number
    rateLimitHit?: boolean
    timestamp?: Date | string
  }

  export type UsageLogUpdateWithoutEndpointInput = {
    id?: StringFieldUpdateOperationsInput | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    statusCode?: IntFieldUpdateOperationsInput | number
    responseTimeMs?: IntFieldUpdateOperationsInput | number
    rateLimitHit?: BoolFieldUpdateOperationsInput | boolean
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: ProjectUpdateOneRequiredWithoutLogsNestedInput
  }

  export type UsageLogUncheckedUpdateWithoutEndpointInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    statusCode?: IntFieldUpdateOperationsInput | number
    responseTimeMs?: IntFieldUpdateOperationsInput | number
    rateLimitHit?: BoolFieldUpdateOperationsInput | boolean
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsageLogUncheckedUpdateManyWithoutEndpointInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    statusCode?: IntFieldUpdateOperationsInput | number
    responseTimeMs?: IntFieldUpdateOperationsInput | number
    rateLimitHit?: BoolFieldUpdateOperationsInput | boolean
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}