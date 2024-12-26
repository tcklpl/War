import { EmptyEntity } from ':engine/data/entity/empty_entity';
import { BCAlaska } from './board_countries/bc_alaska';
import { BCAlgeria } from './board_countries/bc_algeria';
import { BCAral } from './board_countries/bc_aral';
import { BCArgentina } from './board_countries/bc_argentina';
import { BCAustralia } from './board_countries/bc_australia';
import { BCBorneo } from './board_countries/bc_borneo';
import { BCBrazil } from './board_countries/bc_brazil';
import { BCCalifornia } from './board_countries/bc_california';
import { BCChile } from './board_countries/bc_chile';
import { BCChina } from './board_countries/bc_china';
import { BCCongo } from './board_countries/bc_congo';
import { BCCuba } from './board_countries/bc_cuba';
import { BCDudinka } from './board_countries/bc_dudinka';
import { BCEgypt } from './board_countries/bc_egypt';
import { BCEngland } from './board_countries/bc_england';
import { BCFrance } from './board_countries/bc_france';
import { BCGermany } from './board_countries/bc_germany';
import { BCGreenland } from './board_countries/bc_greenland';
import { BCIceland } from './board_countries/bc_iceland';
import { BCIndia } from './board_countries/bc_india';
import { BCJapan } from './board_countries/bc_japan';
import { BCLabrador } from './board_countries/bc_labrador';
import { BCMackenzie } from './board_countries/bc_mackenzie';
import { BCMadagascar } from './board_countries/bc_madagascar';
import { BCMexico } from './board_countries/bc_mexico';
import { BCMiddleEast } from './board_countries/bc_middle_east';
import { BCMongolia } from './board_countries/bc_mongolia';
import { BCMoscow } from './board_countries/bc_moscow';
import { BCNewGuinea } from './board_countries/bc_new_guinea';
import { BCNewYork } from './board_countries/bc_new_york';
import { BCOrnsk } from './board_countries/bc_ornsk';
import { BCOttawa } from './board_countries/bc_ottawa';
import { BCPoland } from './board_countries/bc_poland';
import { BCSiberia } from './board_countries/bc_siberia';
import { BCSouthAfrica } from './board_countries/bc_south_africa';
import { BCSudan } from './board_countries/bc_sudan';
import { BCSumatra } from './board_countries/bc_sumatra';
import { BCSweden } from './board_countries/bc_sweden';
import { BCTchita } from './board_countries/bc_tchita';
import { BCVancouver } from './board_countries/bc_vancouver';
import { BCVenezuela } from './board_countries/bc_venezuela';
import { BCVietnam } from './board_countries/bc_vietnam';
import { BCVladvostok } from './board_countries/bc_vladvostok';

export class BoardCountriesIndex extends EmptyEntity {
    private readonly BoardCountries = {
        alaska: new BCAlaska(),
        algeria: new BCAlgeria(),
        aral: new BCAral(),
        argentina: new BCArgentina(),
        australia: new BCAustralia(),
        borneo: new BCBorneo(),
        brazil: new BCBrazil(),
        california: new BCCalifornia(),
        chile: new BCChile(),
        china: new BCChina(),
        congo: new BCCongo(),
        cuba: new BCCuba(),
        dudinka: new BCDudinka(),
        egypt: new BCEgypt(),
        england: new BCEngland(),
        france: new BCFrance(),
        germany: new BCGermany(),
        greenland: new BCGreenland(),
        iceland: new BCIceland(),
        india: new BCIndia(),
        japan: new BCJapan(),
        labrador: new BCLabrador(),
        mackenzie: new BCMackenzie(),
        madagascar: new BCMadagascar(),
        mexico: new BCMexico(),
        middle_east: new BCMiddleEast(),
        mongolia: new BCMongolia(),
        moscow: new BCMoscow(),
        new_guinea: new BCNewGuinea(),
        new_york: new BCNewYork(),
        ornsk: new BCOrnsk(),
        ottawa: new BCOttawa(),
        poland: new BCPoland(),
        siberia: new BCSiberia(),
        south_africa: new BCSouthAfrica(),
        sudan: new BCSudan(),
        sumatra: new BCSumatra(),
        sweden: new BCSweden(),
        tchita: new BCTchita(),
        vancouver: new BCVancouver(),
        venezuela: new BCVenezuela(),
        vietnam: new BCVietnam(),
        vladvostok: new BCVladvostok(),
    } as const;

    constructor() {
        super({
            name: 'Country container',
        });

        this.allCountries.forEach(c => (c.parent = this));
    }

    getCountry<T extends keyof typeof this.BoardCountries>(country: T): (typeof this.BoardCountries)[T] {
        return this.BoardCountries[country];
    }

    get allCountries() {
        return Object.values(this.BoardCountries);
    }
}
