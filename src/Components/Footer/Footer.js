import React from "react";
import './Footer.css'
function Footer (){

    //gets current year for copyright (big slay)
    const currentYear = new Date().getFullYear();
    return(
        <footer className="footer"  fixed-bottom>
        <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <h6>About</h6>
            <p className="text-justify">QA Real Estate<i>CODE WANTS TO BE SIMPLE </i> is an initiative  to help the upcoming programmers with the code. Scanfcode focuses on providing the most efficient code or snippets as the code wants to be simple. We will help programmers build up concepts in different programming languages that include C, C++, Java, HTML, CSS, Bootstrap, JavaScript, PHP, Android, SQL and Algorithm.</p>
          </div>

      
          <div className="col-xs-6 col-md-3">
            <h6>Quick Links</h6>
            <ul className="footer-links">
              <li><a href="/property">Properties</a></li>
              <li><a href="/seller">Seller</a></li>
              <li><a href="/buyer">Buyers</a></li>
            </ul>
          </div>
        </div>
        
      </div>
      <br/>
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-sm-6 col-xs-12">
            <p className="copyright-text">Copyright &copy; {currentYear} All Rights Reserved by Gemma (Genna)
            </p>
          </div>

          <div className="col-md-4 col-sm-6 col-xs-12">
            <ul className="social-icons">
              <li><a className="facebook" href="https://en-gb.facebook.com/"><i class="bi bi-facebook"></i></a></li>
              <li><a className="twitter" href="https://twitter.com/i/flow/login"><i class="bi bi-twitter-x"></i></a></li>
              <li><a className="linkedin" href="https://www.linkedin.com/login"><i class="bi bi-linkedin"></i></a></li>   
            </ul>
          </div>
        </div>
      </div>
    </footer>
    )
   
};
 
export default Footer;