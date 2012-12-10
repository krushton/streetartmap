streetartmap
============

IO lab project four

StreetArtMap

Street Art Map initially set out to answer some high level questions regarding what is Art.  We wanted to visualize the interaction between socially classified art which is acceptable and that which is not.  We have the title of mural for art that is attractive, and desired and grafitti for art which is unacceptable and is deemed vandalism.  We give users the opportunity to self classify their street expressions by claiming a graffiti report and uploading and image of thier artwork.  In a sense tagging the digital space. Overlaying the street murals with the graffiti data showed some evidence that street murals did not abate graffiti but seemed to encourage it.  The causality is not clear but graffiti and street murals are positively correlated. Ancillary questions invovled how much graffiti correllated to zipcode incomes.  The hypothesis being that higher income zipcodes would have less grafitti.  Also, how is grafitti reported in different zipcodes with different incomes?  Is there more offensive grafitti in wealthier neighborhoods? 

Team Members and Roles

Kate Rushton - data collection, client and server programming for mural data and user submissions 
Quian Quian - client side programming of form inputs and additional form styling
Wendy - front end - filters and chart visualization
Derek Kan - data collection and cleansing, display of income data layer 

Technologies Used

Code - HTML, CSS, Javascript/jQuery, JSON, PHP
APIs - google maps api v3.0, google fusion tables

Demo Version

http://krushton.com/streetartmap/map.html

Known Bugs and Difficulties

Limitations of fusiontables
-Max 5 styles per fusiontable layer, could not style both fusiontable layers.
-Max 100,000 data points (our data set exceeded this limit)
-Feature limit per tile of 500 markers per tile.  Points appear thinned out in areas where points should be prominant.

Chart visualization was disabled due to inteference with the interface. 

Infowindow for mural points and graffiti report points can overlap.  Ideally only a single info window would be active at a time.

