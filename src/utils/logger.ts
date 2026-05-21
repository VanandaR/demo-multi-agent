export type LogLevel = 'info' | 'warn' | 'error';

export function logEvent(level: LogLevel, event: string, payload: Record<string, unknown> = {}) {
   console.log(
       JSON.stringify({
           timestamp: new Date().toISOString(),
           level,
           event,
           ...payload
       })
   );
}
