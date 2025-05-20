*** Settings ***
Library    SeleniumLibrary    screenshot_root_directory=results/screenshots/login
Library    OperatingSystem

*** Variables ***
${EMAIL}    ${EMPTY}
${PASSWORD}    ${EMPTY}
${WPASSWORD}    ${EMPTY}


*** Test Cases ***
Cenário: Login de Usuário com dados corretos
    [Documentation]    Preencher o formulário com dados corretos e testar a funcionalidade de login
    ${EMAIL}=    Get Environment Variable    EMAIL
    ${PASSWORD}=    Get Environment Variable    PASSWORD
    Open Browser    http://localhost:3000    chrome
    Sleep    4s
    Capture Page Screenshot
    Sleep    12s
    Click Link    Entrar
    Sleep     5s
    Input Text    name=email    ${EMAIL}
    Capture Page Screenshot
    Sleep    5s
    Input Password    name=password    ${PASSWORD}
    Capture Page Screenshot
    Sleep   5s
    Click Button    xpath=//button[@type='submit']
    Sleep    5s
    Capture Page Screenshot
    Page Should Contain    Bem-vindo de volta!

Cenário: Login de Usuário com dados incorretos
    [Documentation]    Preencher o formulário com dados incorretos e testar a funcionalidade de login
    ${EMAIL}=    Get Environment Variable    EMAIL
    ${WPASSWORD}=    Get Environment Variable    WPASSWORD
    Open Browser    http://localhost:3000    chrome
    Sleep    4s
    Capture Page Screenshot
    Sleep    12s
    Click Link    Entrar
    Sleep     5s
    Input Text    name=email    ${EMAIL}
    Capture Page Screenshot
    Sleep    5s
    Input Password    name=password    ${WPASSWORD}
    Capture Page Screenshot
    Sleep   5s
    Click Button    xpath=//button[@type='submit']
    Sleep    5s
    Capture Page Screenshot
    Sleep    5s
    Page Should Contain    A senha deve ter no mínimo 6 caracteres
