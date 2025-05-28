*** Settings ***
Library    SeleniumLibrary    screenshot_root_directory=results/screenshots/diario
Library    OperatingSystem
Resource    keywords.robot

*** Variables ***
${EMAIL}    ${EMPTY}
${PASSWORD}    ${EMPTY}
${TITULO}    ${EMPTY}
${DESCRICAO}    ${EMPTY}


*** Test Cases ***
Cenário: Criar diário sem descrição
    [Documentation]    Preencher o diario com emoção e descrição e testar a funcionalidade
    ${EMAIL}=    Get Environment Variable    EMAIL
    ${PASSWORD}=    Get Environment Variable    PASSWORD
    ${TITULO}=    Get Environment Variable    TITULO
    ${DESCRICAO}=    Get Environment Variable    DESCRICAO
    Open Browser    http://localhost:3000    edge    
    Sleep    5s
    Realizar login    ${EMAIL}    ${PASSWORD}
    Sleep    2s
    Click Button    Diário
    Sleep    5s
    Capture Page Screenshot
    Sleep    2s
    Click Element    xpath=//button[contains(., 'feliz')]
    Sleep    2s
    Capture Page Screenshot
    Sleep    2s
    Input Text    xpath=//input[@name="title"]    ${TITULO}
    Sleep    2s
    Capture Page Screenshot

    Sleep    2s
    Click button    Enviar
    Capture Page Screenshot

    Page Should Contain    Informe uma descrição 

Cenário: Criar diário sem título
    [Documentation]    Preencher o diario com emoção e descrição e testar a funcionalidade
    ${EMAIL}=    Get Environment Variable    EMAIL
    ${PASSWORD}=    Get Environment Variable    PASSWORD
    Open Browser    http://localhost:3000    edge    
    Sleep    5s
    Realizar login    ${EMAIL}    ${PASSWORD}
    Sleep    5s
    Click Button    Diário
    Sleep    5s
    Capture Page Screenshot
    Sleep    2s
    Click Element    xpath=//button[contains(., 'feliz')]
    Sleep    2s
    Capture Page Screenshot
    Sleep    2s

    Input Text    xpath=//textarea[@name="description"]    Hoje foi um ótimo dia, me senti muito bem.
    Sleep    8s
    Capture Page Screenshot    
    Sleep    2s
    Click button    Enviar
    Capture Page Screenshot
    Sleep    4s

    Page Should Contain    Informe um título


