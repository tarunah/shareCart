from flask import Flask, request
import smtplib
from email.message import EmailMessage
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import requests
from flask_cors import cross_origin
import json

app = Flask(__name__)

@app.route('/hello', methods=['GET', 'POST'])
def welcome():
    return "Hello World!"


@app.route('/exportCart', methods=['GET', 'POST'])
@cross_origin()
def exportRoute():
    email_subject = "Myntra Cart Shared"
    sender_email_address = "amit.jaggi1@myntra.com"
    receiver_email_address = "tarun.ah2@myntra.com"
    # email_smtp = "10.162.0.98"
    email_password = "uuhtzkqgxbovmhss"
    
    # create an email message object
    # message = EmailMessage()
    
    # configure email headers
    message = MIMEMultipart('alternative')
    message['Subject'] = email_subject
    message['From'] = sender_email_address
    message['To'] = receiver_email_address

    html = """<htm>
   <body>
      <div style="margin: auto;width: 50%;border: 1px solid black;padding: 40px;">
         <tbody>
            <tr>
               <td>
                  <table class="m_5977996538600695452intoArea" style="text-align:center;width:100%;margin-top: 25px;">
                     <tbody>
                        <tr>
                           <td class="m_5977996538600695452headerBar">
                              <a id="m_5977996538600695452TemplateHeaderUrl">
                                 <img id="m_5977996538600695452TemplateHeaderImage" src="https://i.imgur.com/DdPD2BR.jpeg" style="width:50%;height:50%;object-fit:contain" class="CToWUd a6T" data-bit="iit" tabindex="0">
                                 <div class="a6S" dir="ltr" style="opacity: 0.01; left: 1040.67px; top: 108.549px;">
                                    <div id=":1ve" class="T-I J-J5-Ji aQv T-I-ax7 L3 a5q" role="button" tabindex="0" aria-label="Download attachment " jslog="91252; u014N:cOuCgd,Kr2w4b,xr6bB" data-tooltip-class="a1V" data-tooltip="Download">
                                       <div class="akn">
                                          <div class="aSK J-J5-Ji aYr"></div>
                                       </div>
                                    </div>
                                 </div>
                              </a>
                           </td>
                        </tr>
                        <tr>
                           <td>
                              <div class="m_5977996538600695452helloUser" style="font-size:30px;font-family:'Lato',sans-serif;margin-top:35px;color:#282c3f;font-stretch:normal;font-style:normal;line-height:normal;letter-spacing:normal">
                                 Hello
                                 <span id="m_5977996538600695452ReceiverName" style="font-weight:bold">Amit Jaggi</span>
                              </div>
                           </td>
                        </tr>
                     </tbody>
                  </table>
               </td>
            </tr>
            <tr style="margin:0;padding:0">
               <td class="m_5977996538600695452statusContainer" style="margin:0;width:calc(100% - (40px*2))" width="calc(100% - (40*2))">
                  <table style="border-collapse:collapse;border-spacing:0px;width:100%;margin-top:20px">
                     <tbody>
                        <tr style="margin:0;padding:0">
                           <td class="m_5977996538600695452statusGreen" style="margin:0;padding:30px;width:calc(100% - (30px*2));padding-top:20px;background-color:#03a685;color:white" width="calc(100% - (30*2))">
                              <table style="border-collapse:collapse" width="100%">
                                 <tbody>
                                    <tr style="margin:0;padding:0">
                                       <td valign="top" style="margin:0;padding:0">
                                          <div class="m_5977996538600695452whiteLogo" style="margin:0;padding-top:10px;width:30px;margin-right:20px">
                                             <!-- <img style="width:30px;object-fit:contain" src="https://ci5.googleusercontent.com/proxy/9gqYnDE-OwBlS2IUapHmkcKdntz53NTiXEAKEHl5DSYIGPyfiHG2G27ji0FxTCNjmu1REUIVGAiUw1Oq9Jn6TYjlU_-vYA5eK6UIQv_ezQ1vmfgLvhUPkaukAbFx41XhWMPkasNY8iUEId4QAwGSLR7ySmY6kp9LoktrKA6Uw1nQDaDwMm5OYNleJcybNBLfmaMVPNSuT_YTq0uSlw=s0-d-e1-ft#http://assets.myntassets.com/assets/images/retaillabs/2020/2/10/3d5e9899-76a9-4e38-abf5-6c43e04691481581334473847-ic_rad_chk_white-3x.png" class="CToWUd" data-bit="iit"> -->
                                          </div>
                                       </td>
                                       <td valign="top" class="m_5977996538600695452statusCurrentRight" style="margin:0;padding:0">
                                          <table style="border-collapse:collapse" width="100%">
                                             <tbody>
                                                <tr style="margin:0;padding:0">
                                                   <td style="padding:0% 3% 0% 0%" colspan="2">
                                                      <p class="m_5977996538600695452statusText" style="margin:0;padding:0;font-family:'Lato',sans-serif;float:left;width:100%;font-size:32px">
                                                         <span style="font-family:'Lato',sans-serif;font-weight:900;letter-spacing:0.5px">Amit Jaggi</span>
                                                         shared his cart with you
                                                         <span id="m_5977996538600695452CurrentDateId" style="font-family:'Lato',sans-serif;font-size:12px;opacity:0.4;font-weight:bold">on Tue, 27 Feb</span>
                                                      </p>
                                                   </td>
                                                </tr>
                                                <tr style="margin:0;padding:0">
                                                   <td style="padding:0% 3% 0% 0%" colspan="2">
                                                      <br><br>
                                                      <a class="m_44979488866741881statusCTA" style="text-decoration:none;float:left;background:white;padding:10px 30px 12px 24px;margin-top:10px;margin-bottom:10px;border-radius:4px;text-transform:uppercase;font-family:'Lato',sans-serif;font-size:4px;line-height:4px" href="http://dev.myntra.com:8500/checkout/sharedCart?shareId=13" target="_blank">
                                                         <p id="m_44979488866741881DeliveryStaffVirtualNumberId" class="m_44979488866741881trackOrder" style="letter-spacing:0.44px;font-family:'Lato',sans-serif;font-weight:bold;font-size:16px;color:black">
                                                            View Cart Items
                                                         </p>
                                                      </a>
                                                   </td>
                                                   <!-- </tr>
                                                      <tr style="margin:0;padding:0">
                                                      <td style="padding:0% 3% 0% 0%" colspan="2">
                                                      <p class="m_5977996538600695452subStatusText" style="margin:0;padding:0;float:left;width:100%;margin-top:10px;opacity:0.9;font-family:'Lato',sans-serif;font-size:16px;font-weight:normal;font-stretch:normal;font-style:normal;line-height:1.38;color:#ffffff">
                                                      
                                                      We were unable to pickup your return order. This may have happened if our
                                                      associate was unable to reach you or you requested for a reschedule.
                                                      </p>
                                                      </td>
                                                      </tr> -->
                                                <tr style="margin:0;padding:0">
                                                   <td style="padding:0% 3% 0% 0%" colspan="2">
                                                      <p class="m_5977996538600695452subStatusText" style="margin:0;padding:0;float:left;width:100%;margin-top:10px;opacity:0.9;font-family:'Lato',sans-serif;font-size:16px;font-weight:normal;font-stretch:normal;font-style:normal;line-height:1.38;color:#ffffff">
                                                      </p>
                                                   </td>
                                                </tr>
                                             </tbody>
                                          </table>
                                       </td>
                                    </tr>
                                 </tbody>
                              </table>
                           </td>
                        </tr>
                        <!-- <tr style="height:20px"></tr> -->
                     </tbody>
                  </table>
               </td>
            </tr>
            <tr style="margin:0;padding:0">
               <td style="padding:0;float:none;margin:0 auto;width:100%" width="100%">
                  <table class="m_5977996538600695452mainInner" style="float:none;margin:0 auto;width:100%" width="100%">
                     <!-- <tbody><tr style="margin:0;padding:0"> -->
                     <!-- <td class="m_5977996538600695452roseContainer" style="margin:0;padding:30px 40px 20px 40px;background-color:#f5f5f6!important;width:calc(100% - (40px*2));border-radius:8px" width="calc(100% - (40*2))"> -->
                     <table width="100%">
                        <tbody>
                           </tr>
                           <tr style="margin:0;padding:0">
                              <td style="margin:0;padding:20px 20px 0 20px;background-color:white;border-radius:8px;font-size:17px;line-height:23px;color:#7e818c;padding-top:0px;border-top-left-radius:0;border-top-right-radius:0;margin-top:0">
                                 <ul style="margin:0;padding:0;float:left;width:100%;list-style:none;line-height:normal">
                                 </ul>
                              </td>
                           </tr>
                           <tr style="margin:0;padding:0">
                              <td style="margin:0;padding:0">
                                 <div class="m_5977996538600695452halfWidgetsCollectionTable" style="display:table;margin:20px 0;width:100%">
                                 </div>
                              </td>
                           </tr>
                        </tbody>
                     </table>
                     </td>
                     </tr>
                     </tbody>
                  </table>
               </td>
            </tr>
            <tr style="margin:0;padding:0">
               <td style="padding:0;float:none;margin:0 auto;width:100%" width="100%">
                  <table class="m_5977996538600695452mainInner" style="float:none;margin:0 auto;width:100%" width="100%">
                     <tbody>
                        <tr style="margin:0;padding:0">
                           <td class="m_5977996538600695452footerContainer" width="calc(100% - (40*2))" style="margin:0;width:calc(100% - (40px*2)); margin-bottom: -20px;">
                              <table width="100%">
                                 <tbody>
                                    <tr style="margin:0;padding:0">
                                       <td style="margin:0;padding:0">
                                          <a id="m_5977996538600695452TemplateFooterUrl" href="https://url41.myntra.com/ls/click?upn=2Jwz727skYnBvhpEJJSREXtBVOtQRrmqry8W1syt7Go-3De-DX_T5oI5XGP74sWw9D3w2vtqx2VVM5r7GRBboHf-2FtqDhBcFygYxGnId3pRk5CRT6fxMfR-2B2uIixcV-2BK-2Bnfh33fOUhKrrXXzAgSMDBxxjuPNXIm-2F4wv2GM5uHtOy23UIG8idLb-2BIQN1s0-2FIrAIKKUHd4tFlN4wTZOeK2YlctonCDnUgngZU7zxmaME-2BHLQlF9PxNdqxxNAJt2vBCkz73aPNII-2BuDOuPM5ijg6uwuKij90QZafdXHezQWFNIW1hi2TX-2Fz4yLdc25yXxohb3RfeURZfrdfCZi16tsrsOvbrraqjr2z-2BVPkaoqaxSIZQxahmvEXMV-2BDQQnqFibh88mpLcJPABFUNlsjSjXg-2BMMsEQ1QrYwnWnKNxV91-2BHqP0aIDr45s5S0yaJdoq5RcKYTWoXLEzFE1VqxVwO2BMU9Jv6UX3zVVAmZzAX-2FSrjPrKW3zrcCQ3GtU6VMpgWfNyotYTMhECg-3D-3D" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://url41.myntra.com/ls/click?upn%3D2Jwz727skYnBvhpEJJSREXtBVOtQRrmqry8W1syt7Go-3De-DX_T5oI5XGP74sWw9D3w2vtqx2VVM5r7GRBboHf-2FtqDhBcFygYxGnId3pRk5CRT6fxMfR-2B2uIixcV-2BK-2Bnfh33fOUhKrrXXzAgSMDBxxjuPNXIm-2F4wv2GM5uHtOy23UIG8idLb-2BIQN1s0-2FIrAIKKUHd4tFlN4wTZOeK2YlctonCDnUgngZU7zxmaME-2BHLQlF9PxNdqxxNAJt2vBCkz73aPNII-2BuDOuPM5ijg6uwuKij90QZafdXHezQWFNIW1hi2TX-2Fz4yLdc25yXxohb3RfeURZfrdfCZi16tsrsOvbrraqjr2z-2BVPkaoqaxSIZQxahmvEXMV-2BDQQnqFibh88mpLcJPABFUNlsjSjXg-2BMMsEQ1QrYwnWnKNxV91-2BHqP0aIDr45s5S0yaJdoq5RcKYTWoXLEzFE1VqxVwO2BMU9Jv6UX3zVVAmZzAX-2FSrjPrKW3zrcCQ3GtU6VMpgWfNyotYTMhECg-3D-3D&amp;source=gmail&amp;ust=1677571342439000&amp;usg=AOvVaw0uOeBiK8PhrSM6PpG2CbcH">
                                          <img id="m_5977996538600695452TemplateFooterImage" class="m_5977996538600695452footerImg CToWUd" src="https://ci5.googleusercontent.com/proxy/s848bkn8iaiRermTD5bDU0qxCaRyw7c9jwr2ov387ZTUe8msGMVmhLesTW2iYOFfrD9QABZ-64sIuwV8lRHdqmn3TlcN5B3SB6OjfiQwzD75vN9ELmcAeSjCkrh51FfBFB05JwCeJUkIxXImFngyQu7HGUE-THZhH9Pd7mGtpFNZF7g59V6h7ypmTjSb22XsoavoAG1UxrK8JvDe2MTRXKDTbG3Zfhq85Fc=s0-d-e1-ft#https://assets.myntassets.com/assets/images/retaillabs/2021/3/30/4ddf847c-3e89-4615-b89a-3e82b84621641617111996318-Myntra-Footer-Strip_640x148.7px.jpg" alt="myntra" style="float:left;border-radius:8px;width:100%" data-bit="iit">
                                          </a>
                                       </td>
                                    </tr>
                                    <tr style="margin:0;padding:0">
                                       <td class="m_5977996538600695452myntraLogoContainer" bgcolor="white" align="center" style="margin:0;padding:20px 30px 24px 30px;text-align:center">
                                          <img class="m_5977996538600695452myntraLogo CToWUd" id="m_5977996538600695452MyntraLogo" src="https://ci3.googleusercontent.com/proxy/a8VJPb1DTxNUfOw8jRiQUz2onSDoQ0K5UJqBWIV5-b9NUb1VgGD5NeFr-JyADZrzTnBSKcjlVV7tGkos8vD_OB5NIi9KsE5Ik3LVYV4O5FEM0X7gsaGqyO220JFlGmEmhdgyEwx4p7V-GIPsSyKNhdU_3dQJ0_bJT469LAQWZzeBkYKZ8RI7_kP8YzwUXNNyeWjXPnGzbXNy=s0-d-e1-ft#https://assets.myntassets.com/assets/images/retaillabs/2021/1/29/055b4c40-78b7-4050-8fb1-6fd972d4b9991611911755667-myntra-logo_3x.png" width="34" style="width:34px;float:none;object-fit:contain" data-bit="iit">
                                       </td>
                                    </tr>
                                 </tbody>
                              </table>
                           </td>
                        </tr>
                     </tbody>
                  </table>
               </td>
            </tr>
         </tbody>
      </div>
   </body>
   </html>"""

    part2 = MIMEText(html, 'html')
    message.attach(part2)
    # message.set_content("Hellooo world")
    # set smtp server and port
    server = smtplib.SMTP("smtp.gmail.com", '587')
    # identify this client to the SMTP server
    server.ehlo()
    # secure the SMTP connection
    server.starttls()
    
    # login to email account
    server.login(sender_email_address, "uuhtzkqgxbovmhss")
    # send email
    server.send_message(message)
    # close connection to server
    server.quit()
    return {"data": "email sent successfully"}


@app.route('/importCart', methods=['GET', 'POST'])
@cross_origin()
def importCart():
    with open('./importedCart.json', 'r') as f:
        data = json.load(f)
        print(data)
    return {"cartData": data}


@app.route('/mergeCart', methods=['GET', 'POST'])
@cross_origin()
def mergeCart():
    header = {
        'authority': 'stage.myntra.com',
        'accept-language': 'en-US,en;q=0.9',
        "Content-Type" : "application/json",
        "Accept": "application/json",
        #'cookie': 'fox-at=ZXlKaGJHY2lPaUpTVXpJMU5pSXNJbXRwWkNJNklqRWlmUS5leUpoY0hCT1lXMWxJam9pYlhsdWRISmhJaXdpYVhOeklqb2lTVVJGUVNJc0luUnZhMlZ1WDNSNWNHVWlPaUpoZENJc0luTjBiM0psU1dRaU9pSXlNamszSWl3aWJITnBaQ0k2SW1Vd04ySmpaVGhrTFRFd056VXROR1ExWXkwNFltUTNMVFF4TkRNM016VXpNVEZqTmkweE5qYzNOVEkwTURVM09EY3dJaXdpY0NJNklqSXlPVGNpTENKamFXUjRJam9pYlhsdWRISmhMVEF5WkRka1pXTTFMVGhoTURBdE5HTTNOQzA1WTJZM0xUbGtOakprWW1WaE5XVTJNU0lzSW5OMVlsOTBlWEJsSWpvd0xDSnpZMjl3WlNJNklrSkJVMGxESWl3aVpYaHdJam94TmpjM05Ua3dOVEkyTENKdWFXUjRJam9pWldRMU4yUmtZbVV0WWpaalppMHhNV1ZrTFdFek16RXROMlZoT0RkbE0yTmlZMkUySWl3aWFXRjBJam94TmpjM05UZ3pNekkyTENKMWFXUjRJam9pTURZeU5EZzBaakV1TXpFNVppNDBOVE5tTG1JNVlqTXVZVGcxWmpBek9EVm1PRFU0WjBSS1dtMW1ZVWM0WXlKOS5DWmVHZm1QQm4zWGJveFU5Y2FDaUxxd3laN1FTQzdrcTZQUHkwMlk0ZnhMNVpTbDdCSjFqdklGazVacll4eTN2SUNXOHplMlpzZE5EZU9VLXJqbHhsOVVXVWxIQi1aa0FkOWo1cUYwUUZycng1ZTI5SGp6X2o4cWtEVi1PR0x0Y3ZpQlZyZjd3TXhUNkNsNjl4THVyczN1MWJvSFdDNlo3YUJ1SGhJT0cwb2M=' ,
        'x-mynt-ctx': 'storeid=2297;nidx=be5ce1c6-9499-11ec-9df6-9a9a8b75718a;uidx=062484f1.319f.453f.b9b3.a85f0385f858gDJZmfaG8c'
    }
    data = [
        {

            "styleId": 18074826,
            "skuId":  55624322,
            "quantity": 1,
            "sellerPartnerId": 4215,
            "action": "MOVE_TO_CART"
        },
        {

            "styleId": 16532688,
            "skuId": 51915109,
            "quantity": 1,
            "sellerPartnerId": 4214,
            "action": "MOVE_TO_CART"
        },
        {

            "styleId": 20474766,
            "skuId": 64032590,
            "quantity": 2,
            "sellerPartnerId": 6771,
            "action": "MOVE_TO_CART"
        },
        {
            "styleId": 18074920,
            "skuId": 55624898,
            "quantity": 1,
            "sellerPartnerId": 4215,
            "action":"MOVE_TO_CART"
            
        }
    ]  
   
    r = requests.put("http://cartservicev2.stage.myntra.com/myntra-absolut-service/cart/v2/default/add", json=data, headers=header)
    print(r.status_code)
    print("item added")
    return "items added successfully"


@app.route('/mergeAndMovetoWishlist', methods=['GET', 'POST'])
@cross_origin()
def bulkmovetowishlist():
    req_json = request.json
    print(req_json['data'])
    header = {
      'authority': 'stage.myntra.com' ,
      'accept': '*/*', 
      'content-type': 'application/json', 
      'cookie': 'fox-at=ZXlKaGJHY2lPaUpTVXpJMU5pSXNJbXRwWkNJNklqRWlmUS5leUpoY0hCT1lXMWxJam9pYlhsdWRISmhJaXdpYVhOeklqb2lTVVJGUVNJc0luUnZhMlZ1WDNSNWNHVWlPaUpoZENJc0luTjBiM0psU1dRaU9pSXlNamszSWl3aWJITnBaQ0k2SW1Vd04ySmpaVGhrTFRFd056VXROR1ExWXkwNFltUTNMVFF4TkRNM016VXpNVEZqTmkweE5qYzNOVEkwTURVM09EY3dJaXdpY0NJNklqSXlPVGNpTENKamFXUjRJam9pYlhsdWRISmhMVEF5WkRka1pXTTFMVGhoTURBdE5HTTNOQzA1WTJZM0xUbGtOakprWW1WaE5XVTJNU0lzSW5OMVlsOTBlWEJsSWpvd0xDSnpZMjl3WlNJNklrSkJVMGxESWl3aVpYaHdJam94TmpjM05UazRNRFkyTENKdWFXUjRJam9pWldRMU4yUmtZbVV0WWpaalppMHhNV1ZrTFdFek16RXROMlZoT0RkbE0yTmlZMkUySWl3aWFXRjBJam94TmpjM05Ua3dPRFkyTENKMWFXUjRJam9pTURZeU5EZzBaakV1TXpFNVppNDBOVE5tTG1JNVlqTXVZVGcxWmpBek9EVm1PRFU0WjBSS1dtMW1ZVWM0WXlKOS5FTUJoSURQVVVfS1MxUndZaUc0ek5JdjltYjROUFVVVW41cC1ZRHBsQnFZUlN2RW00c2F0a3E1TzA4OTYxMFlzNzdUYXNTT1BpTTV0Sk9KWmdqUjVnSFdkQ2VySlJUSmtROGFBQUN3cmd5MFNaU09KUGJ2QXFNMVZWT3J5S2hzNWUwU2U1b1lLOWkyMXRmbzZ2UnNYc3JhcFN0SVdyOVBZNWZUTlVVQUVaWWs=',
      'origin': 'https://stage.myntra.com',
      'referer': 'https://stage.myntra.com/checkout/cart'
   }
    r = requests.post("https://stage.myntra.com/gateway/v1/cart/default/bulkMoveToWishlist?unselected=true", json = req_json['data'], headers=header)
    print(r.status_code)
    print("item added")
    mergeCart()
    return "items added to wishlist successfully"



@app.route('/checkConflict', methods=['GET', 'POST'])
@cross_origin()
def checkConflicts():
    data = request.json
    print(data)
    conflicts = []
    with open('./importedCart.json', 'r') as f:
        importedData = json.load(f)
        # print(data)
    for product in importedData['products']:
        if(product["skuId"] in data):
            conflicts.append(product["name"])
    return {"data":conflicts}


@app.route('/noConflictWithoutMerge', methods=['GET', 'POST'])
@cross_origin()
def unselectItems():
    data = request.json['data']
    print(data)
    header = {
      'authority': 'stage.myntra.com', 
      'accept': '*/*', 
      'content-type': 'application/json', 
      'cookie': 'fox-at=ZXlKaGJHY2lPaUpTVXpJMU5pSXNJbXRwWkNJNklqRWlmUS5leUpoY0hCT1lXMWxJam9pYlhsdWRISmhJaXdpYVhOeklqb2lTVVJGUVNJc0luUnZhMlZ1WDNSNWNHVWlPaUpoZENJc0luTjBiM0psU1dRaU9pSXlNamszSWl3aWJITnBaQ0k2SW1Vd04ySmpaVGhrTFRFd056VXROR1ExWXkwNFltUTNMVFF4TkRNM016VXpNVEZqTmkweE5qYzNOVEkwTURVM09EY3dJaXdpY0NJNklqSXlPVGNpTENKamFXUjRJam9pYlhsdWRISmhMVEF5WkRka1pXTTFMVGhoTURBdE5HTTNOQzA1WTJZM0xUbGtOakprWW1WaE5XVTJNU0lzSW5OMVlsOTBlWEJsSWpvd0xDSnpZMjl3WlNJNklrSkJVMGxESWl3aVpYaHdJam94TmpjM05UazRNRFkyTENKdWFXUjRJam9pWldRMU4yUmtZbVV0WWpaalppMHhNV1ZrTFdFek16RXROMlZoT0RkbE0yTmlZMkUySWl3aWFXRjBJam94TmpjM05Ua3dPRFkyTENKMWFXUjRJam9pTURZeU5EZzBaakV1TXpFNVppNDBOVE5tTG1JNVlqTXVZVGcxWmpBek9EVm1PRFU0WjBSS1dtMW1ZVWM0WXlKOS5FTUJoSURQVVVfS1MxUndZaUc0ek5JdjltYjROUFVVVW41cC1ZRHBsQnFZUlN2RW00c2F0a3E1TzA4OTYxMFlzNzdUYXNTT1BpTTV0Sk9KWmdqUjVnSFdkQ2VySlJUSmtROGFBQUN3cmd5MFNaU09KUGJ2QXFNMVZWT3J5S2hzNWUwU2U1b1lLOWkyMXRmbzZ2UnNYc3JhcFN0SVdyOVBZNWZUTlVVQUVaWWs=',
      'origin': 'https://stage.myntra.com',
      'referer': 'https://stage.myntra.com/checkout/cart'
    }
    r = requests.put('https://stage.myntra.com/gateway/v1/cart/default/edit?unselected=true', json=data, headers=header)
    mergeCart()
    print(r)
    print(r.status_code)
    print("Unselected items")
    return "items added to cart successfully"





if __name__ == '__main__':
    app.run(host='localhost', port=1050)
