export {};

declare global {
  interface Window {
    kakao: typeof kakao;
  }

  namespace kakao {
    namespace maps {
      function load(callback: () => void): void;

      class LatLng {
        constructor(lat: number, lng: number);
      }

      class Map {
        constructor(container: HTMLElement, options: any);
        setCenter(latlng: LatLng): void;
      }

      class Marker {
        constructor(options: { map: Map; position: LatLng });
      }

      namespace services {
        const Status: {
          OK: 'OK';
          ZERO_RESULT: 'ZERO_RESULT';
          ERROR: 'ERROR';
        };

        type Status = (typeof Status)[keyof typeof Status];

        class Geocoder {
          addressSearch(
            address: string,
            callback: (result: AddressSearchResult, status: Status) => void
          ): void;
        }

        class Places {
          keywordSearch(
            keyword: string,
            callback: (result: PlaceSearchResult[], status: Status) => void,
            options?: { location?: LatLng; radius?: number }
          ): void;
        }

        interface PlaceSearchResult {
          id: string;
          place_name: string;
          road_address_name: string;
          address_name: string;
          x: string;
          y: string;
          phone?: string;
        }

        interface Address {
          x: string;
          y: string;
          address_name: string;
        }

        type AddressSearchResult = Address[];
      }
    }
  }
}
