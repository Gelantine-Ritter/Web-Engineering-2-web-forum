import React, {
    Component
} from 'react'

import logo from '../pics/logo6.png'; // Tell webpack this JS file uses this image
import CarouselTop from '../components/CarouselTop'
import Register from '../components/Register'


class PublicPage1 extends Component {
    render() {
        return(
            <div>
                <div className="bold_head">
                    <h2 className="text-center">Komm ins</h2>
                     <h1 className="text-center font-weight-bold display-1">Girlslab</h1>
                 </div>
                <CarouselTop />   
                <div id="about" className="offset">
                    <div className="col-12 narrow text-center">
                        <h1 className="heading">about</h1>
                        <div className="heading-underline"></div>
                        <p> Wir sind eine Community die sich an Mädchen, Frauen und alle die sich als solche betrachten, richtet. Hier findest du eine Plattform für IT, Digitalisierung und zum Kennenlernen.<br /><br /> Vernetze dich mit Anderen aus der IT Welt und finde
                            deinen Zugang zur Technik und sonstigem Geek-Kram. Nimm an monatlichen Challenges teil, besuche Workshops und diskutiere im Forum.<br /><br /> Vom frickeln in den vier Wänden bis hin zu professionellen Konzepten findest du hier allerlei Themen,
                            Menschen und Tools.
                        </p>
                        <Register />
                    </div>
                </div>

                <div id="faq" className="offset">
                    <div className="col-12 narrow text-center">
                        <h1 className="heading">faq</h1>
                        <div className="heading-underline"></div>
                        <h2>1. Wer? Wie? Was? Wo?</h2>
                        <p>Wir sind eine Frauensternchen-Community, please respect!<br /> Du kannst dich ganz einfach und natürlich kostenlos anmelden und direkt loslegen. Nach dem Login befindest du dich in deinem Lab. Verschaffe dir einen Überblick und frag die Anderen,
                            falls du nicht weiter weißt. Wir treffen uns überwiegend online, aber lass dich nicht davon abhalten vom digitalen zum analogen Lab zu switchen.
                        </p>
                        <h2>2. Was sind Challenges & Workshops?</h2>
                        <p> Was man alles so machen kann, mit wenig und viel Material, digital und analog, zusammen und allein das kannst du dir in unseren Workshops anschauen. Zu einigen Workshops gibt es Challenges, an denen du teilnehmen kannst und eigene Konzepte
                            umsetzen kannst.
                        </p>
                         <h2>3. Noch Fragen?</h2>
                         <p>Du hast noch Fragen? Dann nimm einfach <a href="#divKontakt">hier</a> Kontakt zu unserem Girlslab Team auf! </p>
                    </div>
                </div>

                <div id="kontakt" className="offset">
                    <footer>
                        <div className="row justify-content-center">
                            <div id="divKontakt" className="col-md-5 text-center">
                                <img src={logo} alt="Logo" />
                                <p>bits&bytes Girlslab<br /> Schokosoßenstraße 123 <br />11111 Neverland </p>
                                <strong>Kontakt</strong>
                                <p><br />email@girlslab.de</p>
                                <div className="socialmedia">
                                    <i className="fab fa-facebook-f"></i>
                                    <i className="fab fa-instagram"></i>
                                    <i className="fab fa-twitter"></i>
                                </div>
                            </div>
                            <hr className="socket" /> &copy; bits&bytes girlslab
                        </div>
                    </footer>
                </div>


            </div>
        )
    }
}

export default PublicPage1