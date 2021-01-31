import { App,Provide,Inject } from '@midwayjs/decorator';
import { Application,Context } from 'egg';

@Provide()
export class FootballService {

  @App()
  app: Application;

  @Inject()
  ctx: Context;

  async getFootballList() {
    return {
      "isOk": false,
      "errMsg": "",
      "data": [{
        "id": 1,
        "league_Name": "fj",
        "confirm_add": "2",
        "confirm_all": "20",
        "league_lnglat": {
          "lng": "2.201204",
          "lat": "48.513902"
        }
      }, {
        "id": 2,
        "league_Name": "yj",
        "confirm_add": "8",
        "confirm_all": "68",
        "league_lnglat": {
          "lng": "12.501204",
          "lat": "41.813902"
        }
      },
        {
          "id": 3,
          "league_Name": "xj",
          "confirm_add": "6",
          "confirm_all": "38",
          "league_lnglat": {
            "lng": "-3.421204",
            "lat": "40.253902"
          }
        },
        {
          "id": 4,
          "league_Name": "dj",
          "confirm_add": "2",
          "confirm_all": "38",
          "league_lnglat": {
            "lng": "12.251204",
            "lat": "52.303902"
          }
        },
        {
          "id": 5,
          "league_Name": "yc",
          "confirm_add": "12",
          "confirm_all": "188",
          "league_lnglat": {
            "lng": "0.151204",
            "lat": "51.303902"
          }
        }
      ]
    }
  }



}
