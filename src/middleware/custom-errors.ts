export class BadRequestError extends Error {
  statusCode: number;
  description?: string;
  constructor(message: string) {
    super(message);
    this.statusCode = 400;
  }
}

export class UnAuthorizedError extends Error {
  statusCode: number;
  description?: string;
  constructor(message: string) {
    super(message);
    this.statusCode = 401;
    this.description = `The HTTP 401 Unauthorized response status code
indicates that the client request has not been completed because it lacks valid
authentication credentials for the requested resource.

This status code is sent with an HTTP WWW-Authenticate response header that
contains information on how the client can request for the resource again after
prompting the user for authentication credentials.

This status code is similar to the 403 Forbidden status code, except that in
situations resulting in this status code, user authentication can allow access
to the resource.`;
  }
}

export class ForbiddedError extends Error {
  statusCode: number;
  description?: string;
  constructor(message: string) {
    super(message);
    this.statusCode = 403;
    this.description = `The HTTP 403 Forbidden response status code indicates
that the server understands the request but refuses to authorize it.

This status is similar to 401, but for the 403 Forbidden status code,
re-authenticating makes no difference. The access is tied to the application
logic, such as insufficient rights to a resource.`;
  }
}

export class NotFoundError extends Error {
  statusCode: number;
  description?: string;
  constructor(message: string) {
    super(message);
    this.statusCode = 404;
    this.description = `The HTTP 404 Not Found response status code indicates
that the server cannot find the requested resource. Links that lead to a 404
page are often called broken or dead links and can be subject to link rot.

A 404 status code only indicates that the resource is missing: not whether the
absence is temporary or permanent. If a resource is permanently removed, use
the 410 Gone status instead.`;
  }
}
