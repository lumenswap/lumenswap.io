applicationList = ["amm","auction","lottery","nft","obm","reward"]
nodeVersion="14.16.0-slim"



for app in applicationList:
    f = open(app, "w")

    tempList = applicationList.copy()
    tempList.remove(app)
    
    purgePages=""
    for appToRemove in tempList:
        purgePages+="RUN rm -r ./src/pages/"+appToRemove+"\n"

    dockerStringFormat =(
        "FROM node:"+nodeVersion+"\n"
        "ENV PORT=8080\n\n"
        "COPY package.json package-lock.json /app/\n"
        "WORKDIR /app\n"
        "RUN npm ci\n"
        "COPY . /app\n"
        "RUN rm .eslintrc.js\n\n"
        
        +purgePages+
        "RUN mv ./src/pages/"+app+"/* ./src/pages\n"
        "RUN rm -r ./src/pages/"+app+"\n\n"
        
        "ENV REACT_APP_MODE="+app.upper()+"\n"
        "ENV REACT_APP_HORIZON=https://horizon.stellar.org\n"
        "ENV REACT_APP_LUMENSCAN_URL=https://lumenscan.io\n"
        "ENV REACT_APP_HOST=https://amm.lumenswap.io\n"
        "ENV REACT_APP_LUMEN_API=https://api.lumenswap.io\n"
        "ENV REACT_APP_ENV=production\n"
        "ENV REACT_APP_LOTTERY_ACCOUNT=GAB7STHVD5BDH3EEYXPI3OM7PCS4V443PYB5FNT6CFGJVPDLMKDM24WK\n"
        "ENV REACT_APP_LUSI_ISSUER=GCXSMVCOFOINEEETRTVVGGZRQTVMWT6JSLTR6DXBXZLNYGZSHFXI6V2V\n\n"

        "RUN npm run build\n"
        'CMD ["npm", "run", "start"]'
           
    )
    
    f.write(dockerStringFormat)
    f.close()
    print(app," Generated successfully !")
