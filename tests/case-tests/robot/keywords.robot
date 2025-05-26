*** Settings ***
Library    SeleniumLibrary

*** Keywords ***
Realizar login
    [Arguments]    ${email}    ${senha}
    Click Link    Entrar
    Sleep     2s
    Input Text    name=email    ${email}
    Sleep    2s
    Input Password    name=password    ${senha}
    Sleep   2s
    Click Button    xpath=//button[@type='submit']
    Sleep    3s
