import RestStorageService from './restStorageService.service.js'
import cafeCrew from '../src/assets/teamLogos/cafeCrew.png'
import brewSquad from '../src/assets/teamLogos/brewSquad.png'
import javaJockeys from '../src/assets/teamLogos/javaJockeys.png'
import mugMasters from '../src/assets/teamLogos/mugMasters.png'
import sipStars from '../src/assets/teamLogos/sipStars.png'

let appViewModel = {
    app: {
        endPoint: {
            host: 'qa-api-spring24-env.eba-qjvvdvan.us-east-2.elasticbeanstalk.com',
            port: '80',
            // host: 'localhost',
            // port: 8080,
            protocol: 'http'

        },
        isMock: false,
        header:
            {
                logo: '../public/coffeeIcon.png',
                title: 'The Ultimate #BaristaLife'
            }
    },
    entities: {
        teams: {
            entity: 'teams',
            isMock: true,
            entitySingle: 'team',
            nameCol: 'name',
            list: {
                listTitle: 'Teams List',
                columns: [
                    { label: 'Team Name', name: 'name' },
                    { label: 'Coach Name', name: 'full_name' },
                    { label: 'Coach Phone', name: 'phone' },
                    { label: 'Coach Email', name: 'email' }
                ],
                options: {
                    sortCol: 'name',
                    sortDir: 'asc',
                    filterStr: '',
                    filterCol: 'name',
                    limit: 50,
                    offset: 0
                }
            },
            data: [
                {
                    'id': 1,
                    'leagueId': 1,
                    'name': 'Cafe Crew',
                    'logoUrl': cafeCrew,
                    'coachId': 1,
                    'coachName': 'Eugen Favela',
                    'coachPhone': '958-707-7212',
                    'coachEmail': 'efavela0@xing.com',
                    'numPlayers': 4,
                    'notes': 'Precision in every grind',
                    'motto': 'Brew with passion, serve with flair'
                },
                {
                    'id': 2,
                    'leagueId': 1,
                    'name': 'Brew Squad',
                    'logoUrl': brewSquad,
                    'coachId': 2,
                    'coachName': 'Christa Snaddin',
                    'coachPhone': '150-226-3809',
                    'coachEmail': 'csnaddin1@yahoo.co.jp',
                    'numPlayers': 5,
                    'notes': 'Taste is our priority',
                    'motto': 'Crafting perfection, one cup at a time'
                },
                {
                    'id': 3,
                    'leagueId': 1,
                    'name': 'Java Jockeys',
                    'logoUrl': javaJockeys,
                    'coachId': 3,
                    'coachName': 'Trina Duckitt',
                    'coachPhone': '537-490-1401',
                    'coachEmail': 'tduckitt2@marriott.com',
                    'numPlayers': 4,
                    'notes': 'Balance in every blend',
                    'motto': 'Sip, savor, succeed'
                },
                {
                    'id': 4,
                    'leagueId': 1,
                    'name': 'Mug Masters',
                    'logoUrl': mugMasters,
                    'coachId': 4,
                    'coachName': 'Malanie Fellow',
                    'coachPhone': '416-209-4874',
                    'coachEmail': 'mfellow3@elpais.com',
                    'numPlayers': 5,
                    'notes': 'Innovation fuels our brews',
                    'motto': 'Where tradition meets innovation in every cup'
                },
                {
                    'id': 5,
                    'leagueId': 1,
                    'name': 'Sip Stars',
                    'logoUrl': sipStars,
                    'coachId': 5,
                    'coachName': 'Georgeanna Quinell',
                    'coachPhone': '994-752-8235',
                    'coachEmail': 'gquinell4@unblog.fr',
                    'numPlayers': 3,
                    'notes': 'Creativity in every crema',
                    'motto': 'Espresso excellence, latte love'
                }
            ],
            lookups: {
                coaches: [
                    {
                        coachName: 'Eugen Favela',
                        coachId: 1,
                        coachPhone: '958-707-7212',
                        coachEmail: 'efavela0@xing.com'
                    },
                    {
                        coachName: 'Christa Snaddin',
                        coachId: 2,
                        coachPhone: '150-226-3809',
                        coachEmail: 'csnaddin1@yahoo.co.jp'
                    },
                    {
                        coachName: 'Trina Duckitt',
                        coachId: 3,
                        coachPhone: '537-490-1401',
                        coachEmail: 'tduckitt2@marriott.com'
                    },
                    {
                        coachName: 'Malanie Fellow',
                        coachId: 4,
                        coachPhone: '416-209-4874',
                        coachEmail: 'mfellow3@elpais.com'
                    },
                    {
                        coachName: 'Georgeanna Quinell',
                        coachId: 5,
                        coachPhone: '994-752-8235',
                        coachEmail: 'gquinell4@unblog.fr'
                    }
                ]
            }
        },
        players: {
            entity: 'players',
            entitySingle: 'player',
            nameCol: 'full_name',
            list: {
                options: {
                    sortCol: 'full_name',
                    sortDir: 'asc',
                    filterStr: '',
                    filterCol: 'full_name',
                    limit: 50,
                    offset: 0
                },
                listTitle: 'Baristas List',
                columns: [
                    { label: 'Name', name: 'full_name' },
                    { label: 'Team', name: 'team_name' },
                    { label: 'Address', name: 'full_address' },
                    { label: 'Phone', name: 'phone' },
                    { label: 'Email', name: 'email' }
                ]
            },
            data: [],
            lookups: {
                teams: [
                    { label: 'Java Jockeys', value: 3 },
                    { label: 'Cafe Crew', value: 1 },
                    { label: 'Brew Squad', value: 2 }
                ]
            }
        }
    },

    getApi(entity) {
        let model = this.entities[entity];
        return new RestStorageService(
            entity,
            this.app.endPoint,
            model.list.options
        )
    }
};

export default appViewModel;