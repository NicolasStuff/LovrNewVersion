import InstagramBasicDisplayApi from 'instagram-basic-display';


function Instagram() {

const ig = new InstagramBasicDisplayApi({
    appId: '3002863106448794',
    appSecret: '5ce0e3c60cac85ceb905df501b46d2ff',
    redirectUri: 'https://github.com/NicolasStuff/LovrNewVersion',
    getCode: '',
    apiBaseUrl: 'https://api.instagram.com',
    graphBaseUrl: 'htts://graph.instagram.com',
    userAccesToken: '',
    userAccessTokenExpires: ''
    
})

    console.log(ig.authorizationUrl)
// -> generates a user-code after successfull authorization

  const code = 'IGQVJVNDlGeS0tWEJFTHhhOGpvUjRhMTRHcmt6SXFTaDFKbkczbnF4OHA3c1FwOHFaaG52ZA1ZAKUG96NF9tcm5SeGR0bDJHdWd1UGZA3QmNIdWdYTmczWXc2STdjRjF0anhHalZAxbU5n'

    ig.retrieveToken(code).then(data => {
  
  const token = data.access_token

    ig.retrieveUserNode(token).then(data => {
      console.log(data)
  })
})

return (
<View> 
    <SocialIcon
                title='Synchronisez vos photos Instagram'
                onPress={
                  () => logInAsync()
                }
                button
                type='instagram'
              />
</View>
    
)

};

export default Instagram;