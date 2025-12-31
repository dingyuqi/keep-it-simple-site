---
title: A Record of Troubleshooting a RocketMQ Message Duplicate Issue
tags:
  - Distributed Systems
  - Big Data
  - Middleware
cover: /logo/rocketmq-auto.svg
permalink: /en/article/rocketmq-pullTimeout/
createTime: 2025/12/31 16:31:01
---
On the last day of 2025, I'm recording a RocketMQ message duplicate delivery issue I encountered this year. Essentially, it was caused by incorrect Consumer parameter settings.
<!-- more -->

Observing the duplicate consumption issue when using pullConsumer, I consulted the documentation and found that RocketMQ has a consumption retries feature.

## When to Retries Consumption

- When business processing encounters an error, and the error cannot be retried: When the business cannot currently process the message, and even if the business retry is unlikely to succeed, consumption retries can be used for delayed processing.

- When business processing encounters an error, and the error can be retried: It is recommended that the business implement its own business retry logic in the handler. If the confirmation fails, return an error to RocketMQ.

## Delay Time
The delay time cannot be customized; it depends entirely on the number of retries.

| Number of Retries | 1   | 2   | 3   | 4   | 5   | 6   | 7   | 8   |
| ----------------- | --- | --- | --- | --- | --- | --- | --- | --- |
| Delay Time        | 10s | 30s | 1m  | 2m  | 3m  | 4m  | 5m  | 6m  |

:::tip This investigation was based on the observation that the interval between repeated consumption was exactly 15m, corresponding to the cumulative delay time of 7 retries, which led to the identification of the problem.
:::

## Related Configuration

`ConsumeTimeoutMillis` should not be set too small; otherwise, messages will be delivered repeatedly if not consumed within the time limit.

``` go{7} title="rmq_client.go"
configuration := config.NewDefaultConsumerConfig(settings.ConsumerGroup, settings.Topic, settings.Cluster)
configuration.ConsumeFromWhere = pb.SubscribeRequest_CONSUME_FROM_LATEST
configuration.ConsumeMessageBatchMaxSize = 1
configuration.PullTimeout = time.Millisecond * 10
configuration.SubExpr = settings.Tag
configuration.MaxInFlight = 1
configuration.ConsumeTimeoutMillis = 10 * 1000
```