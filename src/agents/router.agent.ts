export type RouteName="chat"|"coding"|"data"|"tool";

export function routeQuestion(question: string): RouteName {
    const q = question.toLowerCase();
    if(
        q.includes("code")||q.includes("program")||q.includes("develop")||
        q.includes("algorithm")||q.includes("debug")||q.includes("function")||q.includes("class")||q.includes("library")||
        q.includes("framework")||q.includes("api")||q.includes("software")||q.includes("hardware")||
        q.includes("compile")||q.includes("execute")||q.includes("run")||q.includes("build")
    ){
        return "coding";
    }
    if(
        q.includes("data")||q.includes("database")||q.includes("sql")||q.includes("nosql")||
        q.includes("big data")||q.includes("data analysis")||q.includes("data science")||
        q.includes("machine learning")||q.includes("deep learning")||q.includes("artificial intelligence")||
        q.includes("sales")||q.includes("analysis")
    ){
        return "data";
    }

    if(
        q.includes("tool")||q.includes("software")||q.includes("application")||
        q.includes("platform")||q.includes("service")||q.includes("api")
    ){
        return "tool";
    }
    
    return "chat";
}