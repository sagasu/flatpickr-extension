declare var FlatpickrExtension: FlatpickrExtension.FlatpickrExtension;


declare namespace FlatpickrExtension {
    export interface FlatpickrExtension {
        hook(): void;
    }
}

declare module 'flatpickr-extension' {
    export = FlatpickrExtension;
}