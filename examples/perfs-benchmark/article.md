In a matter of having consistent results and avoiding macbook's current state or network current state, project is deployed on now.sh and tested via online tools WebPageTest and online Google Lighthouse. We could add Google PageSpeed Insights, or your favourite performance tool monitoring (i.e Speedcurve or sitespeed.io tools).

Deployed on https://perfs-benchmark-gdjuxaesav.now.sh/

WebPageTest - device Nexus 5, fast 3G
https://www.webpagetest.org/result/180513_NZ_a6711fc73f83ced11e5d6159efc81286/
https://www.webpagetest.org/result/180513_MC_5b7ffc2318246387484ef5ac1611724a/
https://www.webpagetest.org/result/180513_WF_b23d38dd44eb282b7389cbdb32b042e7/

Online Google Lighthouse
https://builder-dot-lighthouse-ci.appspot.com/report.1526221085554.html
https://builder-dot-lighthouse-ci.appspot.com/report.1526221614829.html
https://builder-dot-lighthouse-ci.appspot.com/report.1526221176837.html

Before analyzing, things to keep in mind, we are not looking at now.sh server side speed to render a page and the network time so we'll omit the Time To First Byte.
Key metrics here are :
- First Meaningful Paint
- Time To Interactive