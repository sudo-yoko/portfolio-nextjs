import { ok } from "@/presentation/(system)/types/boundary-result"
import { User } from "@/presentation/users/mvvm/models/users-types";

test('test1-1', () => {
    const obj = ok();
})

test('test1-2', () => {
    const user: User = {userId: "12345", userName:"test taro"}
    const obj = ok(user);
})