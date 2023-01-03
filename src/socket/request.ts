class Request {
    body = {}
    userId = null
    params = null
    constructor(body, userId=null, params=null) {
        this.body = body
        this.userId = userId
        this.params = params
    }

    static fromRestRequest(req) {
        return new Request(req.body, req.body.userId, req.params)
    }
}

export = Request