declare global {
  interface Window {
    websockets: {
      subscribe: (
        binding: string,
        listener: (data: unknown) => void
      ) => () => void;
    };
    commio: Record<string, unknown>;
    commlandEvents: {
      emit: (event: string, ...args: any) => void;
      on: (event: string, callback: (...args: any) => void) => void;
      removeListener: (event: string, callback: (...args: any) => void) => void;
    };
  }
}

export {};
