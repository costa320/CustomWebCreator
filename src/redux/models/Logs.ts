
export interface ElencoLogs {
    [index: number]: SingleLog,
}

export interface SingleLog {

    ID: number,
    MachineName: string,
    SiteName: string,
    Logged: string,  /* "10/05/2021 17:41:47" */
    Level: string,
    UserName: string,
    Message: string,
    Logger: string,
    Properties: string,
    ServerName: string,
    Port: string,
    Url: string,
    Https: string,
    ServerAddress: string,
    RemoteAddress: string,
    Callsite: string,
    Exception: string

}