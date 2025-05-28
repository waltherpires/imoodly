*** Settings ***
Library    SeleniumLibrary    screenshot_root_directory=results/screenshots/register    implicit_wait=5s
Library    OperatingSystem
Resource    keywords.robot

*** Variables ***
${EMAIL}    ${EMPTY}
${PASSWORD}    ${EMPTY}
${WPASSWORD}    ${EMPTY}
${birthdate}    ${EMPTY}
${NAME}    ${EMPTY}

*** Test Cases ***
CASE 1: Teste de sucesso no cadastro de usuário com dados válidos
    [Documentation]  Verificar se um novo usuário consegue se cadastrar no sistema fornecendo todas as informações válidas e obrigatórias.
    #PRE-CONDITIONS
    ${NAME}=    Get Environment Variable    NAME
    ${BIRTHDATE}=    Get Environment Variable    BIRTHDATE
    ${EMAIL}=    Get Environment Variable    EMAIL
    ${PASSWORD}=    Get Environment Variable    PASSWORD
    #1
    Open Browser    http://localhost:3000    edge
    Sleep    2s
    Capture Page Screenshot 
    #2
    Click Link    locator=Entrar
    Sleep    2s
    Capture Page Screenshot
    #3
    Click Link   locator=Crie uma aqui!
    Sleep    2s
    Capture Page Screenshot
    #TEST STEPS
    #4
    Wait Until Element Is Visible    css:input[name="name"]         10s
    Input Text                       css:input[name="name"]         ${NAME}
    Capture Page Screenshot
    #5
    Input Text                       css:input[name="birthdate"]    ${BIRTHDATE}
    Capture Page Screenshot
    #6
    Input Text                       css:input[name="email"]        ${EMAIL}
    Capture Page Screenshot
    #7
    Input Password                   css:input[name="password"]     ${PASSWORD}
    Capture Page Screenshot
    #8
    Input Password                   css:input[name="confirmPassword"]  ${PASSWORD}
    Capture Page Screenshot
    #9
    Click Button                     css:button[type="submit"]
    Capture Page Screenshot
    #10
    Page Should Contain    Cadastrado com sucesso!
    Capture Page Screenshot

CASE 2: Teste de Tentativa de Cadastro com Email Já Existente
    [Documentation]  Verificar se o sistema impede o cadastro de um novo usuário caso o email fornecido já esteja registrado na base de dados.
    #PRE-CONDITIONS
    ${NAME}=    Get Environment Variable    NAME
    ${BIRTHDATE}=    Get Environment Variable    BIRTHDATE
    ${EMAIL}=    Get Environment Variable    EMAIL
    ${PASSWORD}=    Get Environment Variable    PASSWORD
    Open Browser    http://localhost:3000    edge
    Capture Page Screenshot
    Click Link    locator=Entrar
    Sleep    2s
    Capture Page Screenshot
    Click Link   locator=Crie uma aqui!
    Sleep    2s
    Capture Page Screenshot
    #TEST STEPS
    Wait Until Element Is Visible    css:input[name="name"]         10s
    Input Text                       css:input[name="name"]         ${NAME}
    Capture Page Screenshot
    Input Text                       css:input[name="birthdate"]    ${BIRTHDATE}
    Capture Page Screenshot
    Input Text                       css:input[name="email"]        ${EMAIL}
    Capture Page Screenshot
    Input Password                   css:input[name="password"]     ${PASSWORD}
    Capture Page Screenshot
    Input Password                   css:input[name="confirmPassword"]  ${PASSWORD}
    Capture Page Screenshot
    Click Button                     css:button[type="submit"]
    Capture Page Screenshot
    Page Should Contain    Falha ao cadastrar!
    Capture Page Screenshot
