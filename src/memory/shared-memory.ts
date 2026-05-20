type MemoryItem={
    timestamp:string,
    question:string,
    answer:string,
    route:string
}

const memory:MemoryItem[] = [];

export function addToMemory(item: MemoryItem) {
    memory.push({...item, timestamp: new Date().toISOString() });
    if(memory.length > 100) {
        memory.shift(); // Remove the oldest item
    }
}

export function getMemory() {
    return memory;
}