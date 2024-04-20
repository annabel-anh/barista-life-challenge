import {useContext} from 'react';
import {PlayerContext} from '../../../services/contextFactory.jsx';
import CarouselAside from '../../components/CarouselAside/CarouselAside.jsx';
import ListView from '../../components/ListView/ListView.jsx';
import eventImg1 from '../../assets/eventImages/bradley-pisney-d1WGcyc_HWw-unsplash.jpg'
import eventImg2 from '../../assets/eventImages/brooke-cagle-8jp-6SjVibM-unsplash.jpg'
import eventImg3 from '../../assets/eventImages/choi-sungwoo-XiyR0BXRIsI-unsplash.jpg'
import eventImg4 from '../../assets/eventImages/tyler-nix-yGb2igKldYg-unsplash.jpg'


export default function PlayerPage() {
    const {api, viewModel} = useContext(PlayerContext)

    const eventImages = [eventImg1, eventImg2, eventImg3, eventImg4]
    return (
        <div className="container-fluid p-5">
            <div className="mt-4 pt-5">
                <div className="row gx-3 gy-3 d-flex flex-column-reverse flex-xl-row">
                    <div className="col-xl-4">
                        <aside className="bg-dark p-4 rounded-4">
                            <CarouselAside
                                images={eventImages}
                                carouselTitle="Featured Baristas"
                            />
                        </aside>
                    </div>
                    <div className="col-xl-8">
                        <main className="bg-dark p-4 rounded-4">
                            <h1>{viewModel.list.listTitle}</h1>
                            <ListView api={api} viewModel={viewModel}/>
                        </main>
                    </div>
                </div>
            </div>
        </div>
    )
}