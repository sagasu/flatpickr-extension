
export interface FlatpickrExtension {
    hook(): void;
}

declare module 'flatpickr-extension/*' {
    var FlatpickrExtension: any;
    export = FlatpickrExtension;
}