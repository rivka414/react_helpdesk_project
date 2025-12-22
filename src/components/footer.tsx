import type { FunctionComponent } from "react";
import "../css/footer.css";

interface FooterProps {

}

const Footer: FunctionComponent<FooterProps> = () => {
    return (<>

        <footer className="app-footer-container">
            <h2 className="footer_h2">helpDesk</h2>
            <hr />
            <p>אתר תגובת מהיר ואמין</p>
            <p>All rights reserved © 2024</p>
        </footer>
    </>);
}

export default Footer;