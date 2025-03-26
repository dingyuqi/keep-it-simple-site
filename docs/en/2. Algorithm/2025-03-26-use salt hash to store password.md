---
title: How to safely store user passwords in the backend? Add salt!
cover: /cover/password.png
tags:
- Backend
permalink: /en/article/salt-hash-store-password/
createTime: 2025/03/25 14:41:13
---
Almost all systems require users to register and log in, and the most common way to log in is to let users enter their username and password. Many early systems only required usernames and passwords to log in, but some websites have been attacked by brute force, social engineering [+social-engineering] and database attacks [+database-attack]. So what solutions can be used to save customer passwords in the backend?

[+social-engineering]: refers to an attack method that manipulates human psychology rather than technical means to obtain passwords or sensitive information. The core is to exploit human weaknesses, such as trust, fear, curiosity or negligence, to induce the target to actively leak information or perform specific operations.
[+database-attack]: refers to the data in the database being directly exported by the attacker.
<!-- more -->

![How to store passwords in system?](/cover/password.png)

## Plain text password
::: danger Plain text passwords must not be stored in the database.
:::

This storage method may have only been used in the very early days of the Internet. As long as the system needs to pass a security assessment, it is impossible to use this method for storage. Once a security incident such as a database drag occurs, the consequences will be disastrous.

## Hash value encryption
::: warning Try not to store the hash value of the password.
:::

This is a common method used by many students when writing programming homework. Use some simple hash encryption algorithms to encrypt the password and then save its hash value, such as: MD5, SHA-1, etc.

The problem with this method is that although the MD5 algorithm is irreversible, it is relatively easy to crack. It is possible to crack MD5 using collision attacks or rainbow table attacks. There are even many online tools that provide MD5 decryption services.

## Add salt
Salting means adding a randomly generated string to the password before hashing it. This salt value is unique, and even the same password has a different salt value each time. This ensures that the hash value saved by the system is different each time.

![Using salt hash to store passwords](/illustration/salt-hash-store.png)

When we verify the password, we take out the Salt of the current user from the database, concatenate it with the password entered by the current user, and calculate the hash value. Finally, compare it with the hash value stored in the database. If they are consistent, the password is correct.

## Summary
- Do not save plain text passwords.
- Simple hash values ​​of passwords are not recommended.
- Password salting and hashing is a common method at present. A new random salt value needs to be generated for each save.

::: note Many systems have abandoned the account password login method and adopted SMS verification or third-party service login, such as WeChat login, Alipay login, etc. GitHub uses multi-factor authentication (MFA) login method.

These login methods require users to hold the mobile phone reserved during registration or other credible platform accounts bound to log in, which improves security to a certain extent. Because logging in through these methods usually means that in addition to the account, you also need to obtain the user's mobile phone.
:::