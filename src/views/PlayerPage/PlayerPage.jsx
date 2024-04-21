import {useContext} from 'react';
import {PlayerContext} from '../../../services/contextFactory.jsx';
import CarouselAside from '../../components/CarouselAside/CarouselAside.jsx';
import ListView from '../../components/ListView/ListView.jsx';
import person1 from '../../assets/baristaPics/benyamin-bohlouli-z_07LsS_A8E-unsplash.jpg'
import person2 from '../../assets/baristaPics/good-faces-Mff42ssF9XE-unsplash.jpg'
import person3 from '../../assets/baristaPics/brooke-cagle-NoRsyXmHGpI-unsplash.jpg'


export default function PlayerPage() {
    const {api, viewModel} = useContext(PlayerContext)

    const eventImages = [person1, person2, person3]
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