*** Settings ***
Library    SeleniumLibrary
Library    OperatingSystem
Resource    keywords.robot

*** Variables ***
${URL}          http://localhost:3000/dashboard

*** Test Cases ***
Cenário: Tentar submeter meta sem título
    [Documentation]    Tenta criar uma meta sem preencher o título e verifica erro.
    ${EMAIL}=    Get Environment Variable    EMAIL
    ${PASSWORD}=    Get Environment Variable    PASSWORD
    Open Browser    ${URL}    edge
    Sleep    5s
    Realizar login    ${EMAIL}    ${PASSWORD}
    Sleep    2s

    Wait Until Element Is Visible    xpath=//button[contains(text(), "Adicionar Meta")]    timeout=30s
    ${btn}=    Get WebElement    xpath=//button[contains(text(), "Adicionar Meta")]
    Capture Page Screenshot
    Scroll Element Into View    ${btn}
    Sleep    1s
    Click Element    ${btn}

    Sleep    2s
    Wait Until Element Is Visible    xpath=//input[@placeholder="Breve descrição da meta"]    timeout=30s
    # Não preenche o título (Nome da meta)
    Input Text    xpath=//input[@placeholder="Breve descrição da meta"]    Meta de teste sem título
    Capture Page Screenshot

    Wait Until Element Is Visible    xpath=//input[@type="date" and @name="dueDate"]    timeout=30s
    Click Element    xpath=//input[@type="date" and @name="dueDate"]
    Clear Element Text    xpath=//input[@type="date" and @name="dueDate"]
    Press Keys    xpath=//input[@type="date" and @name="dueDate"]    2025-06-30
    Capture Page Screenshot

    Wait Until Element Is Visible    xpath=//input[@placeholder="Quantidade de passos para cumprir a meta" and @type="number"]    timeout=30s
    Input Text    xpath=//input[@placeholder="Quantidade de passos para cumprir a meta" and @type="number"]    3

    Sleep    2s
    Capture Page Screenshot
    Click Button    xpath=//button[contains(text(),"Salvar Meta")]
    Sleep    2s
    Capture Page Screenshot
    Element Should Be Visible    xpath=//input[@placeholder="Nome da meta"]
    Close Browser

Cenário: Submeter meta completa com sucesso
    [Documentation]    Preenche todos os campos da meta e submete com sucesso.
    ${EMAIL}=    Get Environment Variable    EMAIL
    ${PASSWORD}=    Get Environment Variable    PASSWORD
    Open Browser    ${URL}    edge
    Sleep    5s
    Realizar login    ${EMAIL}    ${PASSWORD}
    Sleep    2s

    Wait Until Element Is Visible    xpath=//button[contains(text(), "Adicionar Meta")]    timeout=30s
    ${btn}=    Get WebElement    xpath=//button[contains(text(), "Adicionar Meta")]
    Scroll Element Into View    ${btn}
    Sleep    1s
    Click Element    ${btn}

    Sleep    2s
    Wait Until Element Is Visible    xpath=//input[@placeholder="Nome da meta"]    timeout=30s
    Capture Page Screenshot
    Input Text    xpath=//input[@placeholder="Nome da meta"]    Meta Completa de Teste
    Capture Page Screenshot
    Input Text    xpath=//input[@placeholder="Breve descrição da meta"]    Esta é a descrição da meta completa
    Capture Page Screenshot
    Wait Until Element Is Visible    xpath=//input[@type="date" and @name="dueDate"]    timeout=30s
    Click Element    xpath=//input[@type="date" and @name="dueDate"]
    Clear Element Text    xpath=//input[@type="date" and @name="dueDate"]
    Press Keys    xpath=//input[@type="date" and @name="dueDate"]    2025-6-3
    Capture Page Screenshot
    Wait Until Element Is Visible    xpath=//input[@placeholder="Quantidade de passos para cumprir a meta" and @type="number"]    timeout=30s
    Input Text    xpath=//input[@placeholder="Quantidade de passos para cumprir a meta" and @type="number"]    3
    Sleep    2s
    Capture Page Screenshot
    Click Button    xpath=//button[contains(text(),"Salvar Meta")]
    Sleep    3s
    Capture Page Screenshot
    Element Should Contain    xpath=//*[contains(text(),"Meta Completa de Teste")]    Meta Completa de Teste
    Close Browser
