/* 
    global / helpers functions 
    @author: Luis Castillo
    @date 06-06-2018
    version: 0.3
*/
export const $ = (id) => document.getElementById(id);

export const generateJSON = (className) => {
    const inputs = Array.from(document.getElementsByClassName(className));
    let data = new Object();
    let propsName, propsValue;
    inputs.map(i => {
        propsName = i.id;
        propsValue = i.value;
        data["" + propsName + ""] = propsValue;
    })
    return data;
}

export const validateJSON = (data) => {
    for (let params in data) {
        if (data[params].length === 0) return true;
    }
    return false;
}

export const fetching = (data, method, url) => {
    console.log('fetching!')
    return new Promise((res, rej) => {
        switch (method) {
            case 'GET':
                {
                    fetch(url, {
                        method: 'GET'
                    })
                    .then((res) => res.json())
                    .then((data) => {
                        res(data)
                    })
                    .catch((err) => {
                        rej(err)
                    })
                    break;
                }

            case 'POST':
                {
                    console.log('posting')
                    let datajson = {
                        method: 'POST',
                        body: JSON.stringify(data),
                        withCredentials: true,
                        credentials: 'same-origin',
                        headers: {
                            'Content-type': 'application/x-www-form-urlencoded'
                        }
                    };
                    fetch(url, datajson)
                    .then((res) => res.json())
                    .then((data) => {
                        //console.log(data);                    
                        res(data);
                    })
                    .catch((err) => {
                        console.log('here error')
                        rej(err);
                    })
                    break;
                }
        }        
    })


}