$(document).ready(function() {
    const obj = {
        id: 1,
        $container: null,
        init: function(){

            obj.$container = $('.block');
            if(window.Telegram.WebApp.initData !== "") {
                let userPhoneTG = localStorage.getItem("userPhoneTG");

                window.Telegram.WebApp.ready();

                if(userPhoneTG === null){
                    window.Telegram.WebApp.requestContact((isAccess, res) =>{
                        if(isAccess){
                            localStorage.setItem("userPhoneTG", res.responseUnsafe.contact.phone_number);
                            userPhoneTG = res.responseUnsafe.contact.phone_number;
                            userPhoneTG = userPhoneTG.replace('+', '');
                            if(userPhoneTG === "79910834640" || userPhoneTG === "79272797680"){
                                obj.render(obj.id)
                            }else{
                                window.Telegram.WebApp.close();
                            }
                        }else{
                            window.Telegram.WebApp.close();
                        }
                    });
                }else{
                    userPhoneTG = userPhoneTG.replace('+', '');
                    if(userPhoneTG === "79910834640" || userPhoneTG === "79272797680"){
                        obj.render(obj.id)
                    }else{
                        window.Telegram.WebApp.close();
                    }
                }
            }
        }, 
        render: function(id){
            obj.$container.empty();
            const card = data.find(item => item.id === id);
            if(card !== undefined){
                let $cardHtml = $(`
                    <div class="card">
                        <div class="card__header">
                            <p class="card__number">${card.number}</p>
                        </div>
                        <div class="card__body">
                        </div>
                        <div class="card__footer">
                        </div>
                    </div>`);
                const textSpl = card.text.split('\n');

                textSpl.forEach(text => {
                    const newText = text.replace(/\*(.*?)\*/g, '<br><span style="color: grey;">$1</span>');
                    $cardHtml.find('.card__body').append(`<p>${newText}</p>`);
                });

                card.btn.forEach(btn => {
                    const $btn = $(`<a class="card__btn">№${btn.nextId} ${btn.text}</a>`);
                    $btn.on('click', (e) => {
                        e.preventDefault();
                        obj.id = btn.nextId; 
                        obj.render(obj.id);
                    })
                    $cardHtml.find('.card__footer').append($btn);
                });
                obj.$container.append($cardHtml);
            }
        }
    }

    obj.init();
})